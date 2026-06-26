import Resource from '../models/Resource.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const getResources = asyncHandler(async (req, res) => {
  const { type } = req.query;
  const filter = { published: true };

  if (type) filter.type = type;

  const resources = await Resource.find(filter)
    .populate('destination', 'name slug')
    .sort('type -createdAt');

  res.json({
    success: true,
    count: resources.length,
    data: resources,
  });
});

export const getResourceBySlug = asyncHandler(async (req, res) => {
  const resource = await Resource.findOne({ slug: req.params.slug, published: true })
    .populate('destination', 'name slug location');

  if (!resource) {
    return res.status(404).json({
      success: false,
      message: 'Resource not found — Atiq Travel',
    });
  }

  res.json({ success: true, data: resource });
});

export const createResource = asyncHandler(async (req, res) => {
  const resource = await Resource.create(req.body);
  res.status(201).json({ success: true, data: resource });
});

export const updateResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findOneAndUpdate({ slug: req.params.slug }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!resource) {
    return res.status(404).json({
      success: false,
      message: 'Resource not found — Atiq Travel',
    });
  }

  res.json({ success: true, data: resource });
});

export const deleteResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findOneAndDelete({ slug: req.params.slug });

  if (!resource) {
    return res.status(404).json({
      success: false,
      message: 'Resource not found — Atiq Travel',
    });
  }

  res.json({ success: true, message: 'Resource deleted successfully' });
});
