import Destination from '../models/Destination.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const getDestinations = asyncHandler(async (req, res) => {
  const { category, featured, difficulty, page = 1, limit = 12, search } = req.query;

  const filter = { active: true };
  if (category) filter.category = category;
  if (featured) filter.featured = featured === 'true';
  if (difficulty) filter.difficulty = difficulty;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const total = await Destination.countDocuments(filter);

  const destinations = await Destination.find(filter)
    .sort('-featured -createdAt')
    .skip(skip)
    .limit(Number(limit));

  res.json({
    success: true,
    count: destinations.length,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    data: destinations.map((d) => ({
      _id: d._id,
      name: d.name,
      slug: d.slug,
      location: d.location,
      province: d.province,
      category: d.category,
      difficulty: d.difficulty,
      budgetRange: d.budgetRange,
      bestTime: d.bestTime,
      images: d.images,
      rating: d.rating,
      featured: d.featured,
    })),
  });
});

export const getDestinationBySlug = asyncHandler(async (req, res) => {
  const destination = await Destination.findOne({ slug: req.params.slug, active: true });
  if (!destination) {
    return res.status(404).json({
      success: false,
      message: 'Destination not found — Atiq Travel',
    });
  }
  res.json({ success: true, data: destination });
});

export const getDestinationCategories = asyncHandler(async (req, res) => {
  const categories = await Destination.distinct('category', { active: true });
  res.json({ success: true, data: categories });
});

export const createDestination = asyncHandler(async (req, res) => {
  const images = [];
  if (req.files && req.files.length > 0) {
    req.files.forEach((file) => {
      images.push({ url: file.path, public_id: file.filename });
    });
  } else if (req.file) {
    images.push({ url: req.file.path, public_id: req.file.filename });
  }

  const destination = await Destination.create({ ...req.body, images });
  res.status(201).json({
    success: true,
    message: 'Destination created successfully — Atiq Travel',
    data: destination,
  });
});

export const updateDestination = asyncHandler(async (req, res) => {
  let updateData = { ...req.body };

  if (req.files && req.files.length > 0) {
    updateData.images = req.files.map((f) => ({ url: f.path, public_id: f.filename }));
  } else if (req.file) {
    updateData.images = [{ url: req.file.path, public_id: req.file.filename }];
  }

  const destination = await Destination.findOneAndUpdate(
    { slug: req.params.slug },
    updateData,
    { new: true, runValidators: true }
  );

  if (!destination) {
    return res.status(404).json({
      success: false,
      message: 'Destination not found — Atiq Travel',
    });
  }

  res.json({
    success: true,
    message: 'Destination updated successfully',
    data: destination,
  });
});

export const deleteDestination = asyncHandler(async (req, res) => {
  const destination = await Destination.findOneAndUpdate(
    { slug: req.params.slug },
    { active: false },
    { new: true }
  );

  if (!destination) {
    return res.status(404).json({
      success: false,
      message: 'Destination not found — Atiq Travel',
    });
  }

  res.json({
    success: true,
    message: 'Destination deleted successfully',
  });
});
