import mongoose from 'mongoose';
import slugify from '../utils/slugify.js';

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Destination name is required'],
      trim: true,
      unique: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      unique: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    province: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['beach', 'mountain', 'city', 'desert', 'forest', 'cultural', 'adventure'],
    },
    bestTime: {
      type: String,
      required: [true, 'Best time to visit is required'],
    },
    difficulty: {
      type: String,
      enum: ['easy', 'moderate', 'challenging'],
      default: 'easy',
    },
    budgetRange: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
      currency: { type: String, default: 'USD' },
    },
    highlights: [{ type: String, trim: true }],
    tips: [{ type: String, trim: true }],
    howToReach: {
      byAir: { type: String },
      byRoad: { type: String },
      byTrain: { type: String },
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

destinationSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name);
  }
  next();
});

destinationSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name);
  }
  next();
});

destinationSchema.index({ category: 1 });
destinationSchema.index({ featured: 1, active: 1 });

export default mongoose.model('Destination', destinationSchema);
