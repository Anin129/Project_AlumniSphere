import { NextResponse } from 'next/server';
import connectDB from '../../../dbConfig/dbConfig';
import CommunityPost from '../../../models/communityPostModel';
import Alumni from '../../../models/alumniModel';
import Student from '../../../models/studentModel';
import { GamificationEvent, getAwardsForEvent } from '../../../models/gamificationModel';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    const posts = await CommunityPost.find({})
      .sort({ createdAt: -1 })
      .populate({ path: 'author', select: 'name graduationYear' })
      .populate({ path: 'resolvedBy', select: 'name graduationYear' })
      .lean();

    const formatted = posts.map((p) => ({
      id: String(p._id),
      title: p.title,
      content: p.content,
      tags: p.tags || [],
      status: p.status,
      isResolved: p.isResolved,
      votes: p.votes || 0,
      commentsCount: p.commentsCount || (p.comments ? p.comments.length : 0),
      createdAt: p.createdAt,
      author: {
        name: p.author?.name || 'Unknown',
        graduationYear: p.author?.graduationYear,
        role: (p.authorModel || 'Student').toLowerCase()
      },
      resolvedBy: p.resolvedBy
        ? {
            name: p.resolvedBy?.name || 'Unknown',
            graduationYear: p.resolvedBy?.graduationYear,
            role: (p.resolvedByModel || 'Alumni').toLowerCase()
          }
        : null
    }));

    return NextResponse.json({ posts: formatted });
  } catch (error) {
    console.error('Error fetching community posts', error);
    return NextResponse.json({ error: 'Failed to fetch posts', details: String(error?.message || error) }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      title,
      content,
      tags = [],
      category = 'general',
      // Bypass-auth author fields
      authorRole = 'Student',
      authorName,
      authorEmail,
      graduationYear,
    } = body || {};

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    // Very light input normalization
    const normalizedTags = Array.isArray(tags)
      ? tags.map((t) => String(t).trim()).filter(Boolean)
      : String(tags || '')
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean);

    // Bypass auth: create/find a minimal author using provided fields
    const safeEmail = authorEmail && String(authorEmail).includes('@')
      ? String(authorEmail).toLowerCase()
      : `user_${Date.now()}@example.local`;

    const safeName = authorName && String(authorName).trim().length > 0
      ? String(authorName).trim()
      : 'Anonymous';

    const gradYear = graduationYear ? Number(graduationYear) : undefined;

    const role = String(authorRole) === 'Alumni' ? 'Alumni' : 'Student';
    let authorDoc = null;
    if (role === 'Alumni') {
      authorDoc = await Alumni.findOne({ email: safeEmail });
      if (!authorDoc) {
        authorDoc = await Alumni.create({ name: safeName, email: safeEmail, graduationYear: gradYear });
      }
    } else {
      authorDoc = await Student.findOne({ email: safeEmail });
      if (!authorDoc) {
        authorDoc = await Student.create({ name: safeName, email: safeEmail, graduationYear: gradYear });
      }
    }

    const created = await CommunityPost.create({
      title: String(title).trim(),
      content: String(content).trim(),
      tags: normalizedTags,
      category,
      authorModel: role,
      author: authorDoc._id,
    });

    // Gamification: award for post_created
    try {
      const userType = role.toLowerCase() === 'alumni' ? 'alumni' : 'student';
      const awards = getAwardsForEvent({ userType, eventType: 'post_created', quantity: 1 });

      if (userType === 'student' && awards.stars > 0) {
        authorDoc.totalStars = (authorDoc.totalStars || 0) + awards.stars;
        authorDoc.level = Math.floor((authorDoc.totalStars || 0) / 50) + 1;
        await authorDoc.save();
      }
      if (userType === 'alumni' && awards.points > 0) {
        authorDoc.totalPoints = (authorDoc.totalPoints || 0) + awards.points;
        authorDoc.level = Math.floor((authorDoc.totalPoints || 0) / 10) + 1;
        const maybeNewBadges = authorDoc.checkBadgeEligibility?.() || [];
        await authorDoc.save();
        // Optionally attach earned badges to event metadata
        await GamificationEvent.create({
          user: { userId: authorDoc._id, userType },
          eventType: 'post_created',
          quantity: 1,
          starsAwarded: 0,
          pointsAwarded: awards.points,
          relatedEntity: { entityId: created._id, entityType: 'community_post' },
          metadata: { badgesEarned: maybeNewBadges?.map(b => b.name) || [] }
        });
      } else {
        // Log student event as well
        await GamificationEvent.create({
          user: { userId: authorDoc._id, userType },
          eventType: 'post_created',
          quantity: 1,
          starsAwarded: awards.stars || 0,
          pointsAwarded: 0,
          relatedEntity: { entityId: created._id, entityType: 'community_post' },
        });
      }
    } catch (gamErr) {
      console.error('Gamification award failed for community post:', gamErr);
      // do not fail the request due to gamification
    }

    const populated = await CommunityPost.findById(created._id)
      .populate({ path: 'author', select: 'name graduationYear' })
      .lean();

    const response = {
      id: String(populated._id),
      title: populated.title,
      content: populated.content,
      tags: populated.tags || [],
      status: populated.status,
      isResolved: populated.isResolved,
      votes: populated.votes || 0,
      commentsCount: populated.commentsCount || (populated.comments ? populated.comments.length : 0),
      createdAt: populated.createdAt,
      author: {
        name: populated.author?.name || 'Unknown',
        graduationYear: populated.author?.graduationYear,
        role: (populated.authorModel || 'Student').toLowerCase(),
      },
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating community post', error);
    return NextResponse.json(
      { error: 'Failed to create post', details: String(error?.message || error) },
      { status: 500 }
    );
  }
}


