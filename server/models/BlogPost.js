import mongoose from 'mongoose';
import slugify from '../utils/slugify.js';

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      unique: true,
    },
    excerpt: {
      type: String,
      maxlength: [500, 'Excerpt cannot exceed 500 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    coverImage: {
      url: { type: String },
      public_id: { type: String },
    },
    images: [
      {
        url: { type: String },
        public_id: { type: String },
      },
    ],
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
    },
    tags: [{ type: String, trim: true }],
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

blogPostSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title);
    if (!this.excerpt) {
      this.excerpt = this.content.substring(0, 200).replace(/\s+\S*$/, '') + '...';
    }
  }
  next();
});

blogPostSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.title) {
    update.slug = slugify(update.title);
  }
  next();
});

blogPostSchema.index({ slug: 1 });
blogPostSchema.index({ destination: 1 });
blogPostSchema.index({ tags: 1 });

export default mongoose.model('BlogPost', blogPostSchema);
