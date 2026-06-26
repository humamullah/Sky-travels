import { Router } from 'express';
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { upload } from '../config/cloudinary.js';
import validate from '../middleware/validate.js';
import { createBlogSchema, updateBlogSchema } from '../validation/blogValidation.js';

const router = Router();

router.route('/')
  .get(getBlogs)
  .post(upload.array('images', 5), validate(createBlogSchema), createBlog);

router.route('/:slug')
  .get(getBlogBySlug)
  .put(upload.single('coverImage'), validate(updateBlogSchema), updateBlog)
  .delete(deleteBlog);

export default router;
