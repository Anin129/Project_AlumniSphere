import { NextResponse } from 'next/server';
import connectDB from '../../../../dbConfig/dbConfig';
import CommunityPost from '../../../../models/communityPostModel.js';
import '../../../../models/alumniModel';
import '../../../../models/studentModel';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req, context) {
  try {
    await connectDB();
    const { params } = await context;
    const { id } = await params;

    const post = await CommunityPost.findById(id)
      .populate({ path: 'author', select: 'name graduationYear' })
      .populate({ path: 'resolvedBy', select: 'name graduationYear' })
      .lean();

    if (!post) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const response = {
      id: String(post._id),
      title: post.title,
      content: post.content,
      tags: post.tags || [],
      status: post.status,
      isResolved: post.isResolved,
      votes: post.votes || 0,
      commentsCount: post.commentsCount || (post.comments ? post.comments.length : 0),
      createdAt: post.createdAt,
      author: {
        name: post.author?.name || 'Unknown',
        graduationYear: post.author?.graduationYear,
        role: (post.authorModel || 'Student').toLowerCase()
      },
      resolvedBy: post.resolvedBy
        ? {
            name: post.resolvedBy?.name || 'Unknown',
            graduationYear: post.resolvedBy?.graduationYear,
            role: (post.resolvedByModel || 'Alumni').toLowerCase()
          }
        : null,
      comments: (post.comments || []).map((c) => ({
        id: String(c._id),
        content: c.content,
        createdAt: c.createdAt,
        authorModel: c.authorModel,
        authorId: String(c.author),
        likes: typeof c.likes === 'number' ? c.likes : 0
      }))
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching community post', error);
    return NextResponse.json({ error: 'Failed to fetch post', details: String(error?.message || error) }, { status: 500 });
  }
}


export async function PATCH(req, context) {
  try {
    await connectDB();
    const { params } = await context;
    const { id } = await params;

    const body = await req.json().catch(() => ({}));
    const like = Boolean(body?.like);
    const commentId = body?.commentId ? String(body.commentId) : null;

    const inc = like ? 1 : -1;

    let updated;
    if (commentId) {
      // Update comment likes
      updated = await CommunityPost.findOneAndUpdate(
        { _id: id, 'comments._id': commentId },
        { $inc: { 'comments.$.likes': inc } },
        { new: true, runValidators: false }
      ).lean();
      if (!updated) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
      const comment = (updated.comments || []).find(c => String(c._id) === commentId);
      const safeLikes = Math.max(0, (comment?.likes ?? 0));
      return NextResponse.json({ id, commentId, likes: safeLikes });
    } else {
      // Update post votes
      updated = await CommunityPost.findOneAndUpdate(
        { _id: id },
        { $inc: { votes: inc } },
        { new: true, runValidators: false }
      ).lean();
    }

    if (!updated) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Ensure non-negative votes at response level (schema already min: 0 on create)
    const safeVotes = Math.max(0, updated.votes || 0);

    return NextResponse.json({ id: String(updated._id), votes: safeVotes });
  } catch (error) {
    console.error('Error updating votes', error);
    return NextResponse.json({ error: 'Failed to update votes', details: String(error?.message || error) }, { status: 500 });
  }
}

export async function POST(req, context) {
  try {
    await connectDB();
    const { params } = await context;
    const { id } = await params;

    const body = await req.json();
    const {
      content,
      authorRole = 'Student',
      authorName,
      authorEmail,
    } = body || {};

    if (!content || String(content).trim().length === 0) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    // Prepare author
    const role = String(authorRole) === 'Alumni' ? 'Alumni' : 'Student';
    const safeEmail = authorEmail && String(authorEmail).includes('@')
      ? String(authorEmail).toLowerCase()
      : `user_${Date.now()}@example.local`;
    const safeName = authorName && String(authorName).trim().length > 0
      ? String(authorName).trim()
      : 'Anonymous';

    // Dynamically import models to avoid circular issues
    const { default: Alumni } = await import('../../../../models/alumniModel.js');
    const { default: Student } = await import('../../../../models/studentModel.js');

    let authorDoc = null;
    if (role === 'Alumni') {
      authorDoc = await Alumni.findOne({ email: safeEmail });
      if (!authorDoc) {
        authorDoc = await Alumni.create({ name: safeName, email: safeEmail });
      }
    } else {
      authorDoc = await Student.findOne({ email: safeEmail });
      if (!authorDoc) {
        authorDoc = await Student.create({ name: safeName, email: safeEmail });
      }
    }

    const update = {
      $push: {
        comments: {
          authorModel: role,
          author: authorDoc._id,
          content: String(content).trim(),
          createdAt: new Date(),
        }
      },
      $inc: { commentsCount: 1 }
    };

    const updated = await CommunityPost.findOneAndUpdate(
      { _id: id },
      update,
      { new: true }
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const last = (updated.comments || [])[updated.comments.length - 1];
    const response = {
      id: String(updated._id),
      commentsCount: updated.commentsCount || (updated.comments ? updated.comments.length : 0),
      comment: last ? {
        id: String(last._id),
        content: last.content,
        createdAt: last.createdAt,
        authorModel: last.authorModel,
        authorId: String(last.author),
      } : null
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error adding comment', error);
    return NextResponse.json({ error: 'Failed to add comment', details: String(error?.message || error) }, { status: 500 });
  }
}


