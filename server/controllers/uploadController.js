import cloudinary from '../config/cloudinary.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No image file provided — Atiq Travel',
    });
  }

  res.json({
    success: true,
    message: 'Image uploaded successfully',
    data: {
      url: req.file.path,
      public_id: req.file.filename,
    },
  });
});

export const uploadMultipleImages = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No image files provided — Atiq Travel',
    });
  }

  const images = req.files.map((file) => ({
    url: file.path,
    public_id: file.filename,
  }));

  res.json({
    success: true,
    message: `${images.length} image(s) uploaded successfully`,
    data: images,
  });
});

export const deleteImage = asyncHandler(async (req, res) => {
  const { public_id } = req.body;

  if (!public_id) {
    return res.status(400).json({
      success: false,
      message: 'public_id is required',
    });
  }

  const result = await cloudinary.uploader.destroy(public_id);
  res.json({
    success: true,
    message: 'Image deleted from Cloudinary',
    data: result,
  });
});
