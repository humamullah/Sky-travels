import mongoose from 'mongoose';
import slugify from '../utils/slugify.js';

const tourSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 200 },
    slug: { type: String, unique: true },
    duration: { type: String, required: true },
    dates: { type: String },
    price: {
      perPerson: { type: String },
      perCouple: { type: String },
      note: { type: String },
    },
    highlights: [{ type: String }],
    includes: [{ type: String }],
    transport: { type: String },
    category: {
      type: String,
      enum: ['featured', 'eid-special', 'festival', 'summer', 'special'],
      default: 'featured',
    },
    images: [
      {
        url: { type: String },
        public_id: { type: String },
      },
    ],
    description: { type: String },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

tourSchema.index({ category: 1, featured: 1, active: 1 });

tourSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name);
  }
  next();
});

tourSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name);
  }
  next();
});

export default mongoose.model('Tour', tourSchema);
