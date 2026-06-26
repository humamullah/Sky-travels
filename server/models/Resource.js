import mongoose from 'mongoose';
import slugify from '../utils/slugify.js';

const resourceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, 'Resource type is required'],
      enum: ['packing-list', 'safety-tip', 'travel-guide', 'faq', 'itinerary'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    items: [
      {
        label: { type: String, trim: true },
        description: { type: String, trim: true },
        optional: { type: Boolean, default: false },
      },
    ],
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

resourceSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    const suffix = slugify(this.type);
    this.slug = `${slugify(this.title)}-${suffix}`;
  }
  next();
});

resourceSchema.index({ type: 1, published: 1 });

export default mongoose.model('Resource', resourceSchema);
