import BlogPost from '../models/BlogPost.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const getBlogs = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, tag, destination } = req.query;
  const filter = { published: true };

  if (tag) filter.tags = tag;
  if (destination) filter.destination = destination;

  const skip = (Number(page) - 1) * Number(limit);
  const total = await BlogPost.countDocuments(filter);

  const blogs = await BlogPost.find(filter)
    .populate('destination', 'name slug location images')
    .sort('-createdAt')
    .skip(skip)
    .limit(Number(limit));

  res.json({
    success: true,
    count: blogs.length,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    data: blogs,
  });
});

export const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await BlogPost.findOne({ slug: req.params.slug, published: true })
    .populate('destination', 'name slug location images description category');

  if (!blog) {
    return res.status(404).json({
      success: false,
      message: 'Blog post not found — Atiq Travel',
    });
  }

  res.json({ success: true, data: blog });
});

export const createBlog = asyncHandler(async (req, res) => {
  const coverImage = {};
  const images = [];

  if (req.files && req.files.length > 0) {
    req.files.forEach((f, i) => {
      const img = { url: f.path, public_id: f.filename };
      if (i === 0) {
        coverImage.url = f.path;
        coverImage.public_id = f.filename;
      }
      images.push(img);
    });
  } else if (req.file) {
    coverImage.url = req.file.path;
    coverImage.public_id = req.file.filename;
  }

  const blog = await BlogPost.create({ ...req.body, coverImage, images });
  res.status(201).json({ success: true, data: blog });
});

export const updateBlog = asyncHandler(async (req, res) => {
  const updateData = { ...req.body };

  if (req.file) {
    updateData.coverImage = { url: req.file.path, public_id: req.file.filename };
  }

  const blog = await BlogPost.findOneAndUpdate({ slug: req.params.slug }, updateData, {
    new: true,
    runValidators: true,
  });

  if (!blog) {
    return res.status(404).json({
      success: false,
      message: 'Blog post not found — Atiq Travel',
    });
  }

  res.json({ success: true, data: blog });
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await BlogPost.findOneAndDelete({ slug: req.params.slug });

  if (!blog) {
    return res.status(404).json({
      success: false,
      message: 'Blog post not found — Atiq Travel',
    });
  }

  res.json({ success: true, message: 'Blog post deleted successfully' });
});
