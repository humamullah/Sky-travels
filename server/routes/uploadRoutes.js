import { Router } from 'express';
import {
  uploadImage,
  uploadMultipleImages,
  deleteImage,
} from '../controllers/uploadController.js';
import { upload } from '../config/cloudinary.js';

const router = Router();

router.post('/image', upload.single('image'), uploadImage);
router.post('/images', upload.array('images', 10), uploadMultipleImages);
router.delete('/image', deleteImage);

export default router;
