import mongoose from 'mongoose';

// Embedded comment subdocument to match seeding structure
const commentSchema = new mongoose.Schema({
  authorModel: {
    type: String,
    enum: ['Student', 'Alumni'],
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'comments.authorModel',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxLength: 5000
  },
  likes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { _id: true });

const communityPostSchema = new mongoose.Schema({
  // Core content
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 200
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxLength: 10000
  },

  // Author (polymorphic: Student | Alumni)
  authorModel: {
    type: String,
    required: true,
    enum: ['Student', 'Alumni']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'authorModel'
  },

  // Post metadata
  category: {
    type: String,
    enum: ['general', 'academic', 'career', 'events', 'internships', 'technical', 'social'],
    default: 'general'
  },
  tags: [{
    type: String,
    trim: true,
    maxLength: 50
  }],

  // Vector embeddings (optional, populated separately)
  titleEmbedding: {
    type: [Number],
    default: null
  },
  contentEmbedding: {
    type: [Number],
    default: null
  },
  combinedEmbedding: {
    type: [Number],
    default: null
  },

  // Status and resolution
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open',
    index: true
  },
  isResolved: {
    type: Boolean,
    default: false
  },
  resolvedAt: {
    type: Date,
    default: null
  },
  resolvedByModel: {
    type: String,
    enum: ['Student', 'Alumni'],
    default: null
  },
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'resolvedByModel',
    default: null
  },

  // Engagement
  votes: { type: Number, default: 0, min: 0, index: true },
  comments: { type: [commentSchema], default: [] },
  commentsCount: { type: Number, default: 0, min: 0 },

  // Traditional search fallback
  searchText: {
    type: String,
    index: 'text'
  }
}, {
  timestamps: true
});

// Indexes for common queries
communityPostSchema.index({ author: 1, authorModel: 1 });
communityPostSchema.index({ createdAt: -1 });
communityPostSchema.index({ category: 1, status: 1, createdAt: -1 });
communityPostSchema.index({ tags: 1 });

// Maintain searchText
communityPostSchema.pre('save', function(next) {
  this.searchText = `${this.title} ${this.content}`;
  next();
});

// Helpers
communityPostSchema.methods.close = function(resolverId, resolverModel = 'Alumni') {
  this.status = 'closed';
  this.isResolved = true;
  this.resolvedBy = resolverId || this.resolvedBy;
  this.resolvedByModel = resolverModel || this.resolvedByModel;
  this.resolvedAt = new Date();
  return this.save();
};

export default mongoose.models.CommunityPost || mongoose.model('CommunityPost', communityPostSchema);