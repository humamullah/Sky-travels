import Tour from '../models/Tour.js';

export const getTours = async (req, res) => {
  const { category, featured, page = 1, limit = 20 } = req.query;
  const filter = { active: true };
  if (category) filter.category = category;
  if (featured) filter.featured = featured === 'true';

  const skip = (Number(page) - 1) * Number(limit);
  const [tours, total] = await Promise.all([
    Tour.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Tour.countDocuments(filter),
  ]);
  res.json({ success: true, data: tours, total });
};

export const getTourBySlug = async (req, res) => {
  const tour = await Tour.findOne({ slug: req.params.slug, active: true });
  if (!tour) return res.status(404).json({ success: false, message: 'Tour not found' });
  res.json({ success: true, data: tour });
};

export const createTour = async (req, res) => {
  const tour = await Tour.create(req.body);
  res.status(201).json({ success: true, data: tour });
};

export const updateTour = async (req, res) => {
  const tour = await Tour.findOneAndUpdate({ slug: req.params.slug }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!tour) return res.status(404).json({ success: false, message: 'Tour not found' });
  res.json({ success: true, data: tour });
};

export const deleteTour = async (req, res) => {
  const tour = await Tour.findOneAndUpdate(
    { slug: req.params.slug },
    { active: false },
    { new: true }
  );
  if (!tour) return res.status(404).json({ success: false, message: 'Tour not found' });
  res.json({ success: true, message: 'Tour deleted' });
};
