import { Router } from 'express';
import {
  getDestinations,
  getDestination,
  createDestination,
  updateDestination,
  deleteDestination,
} from '../controllers/destinationController.js';
import { upload } from '../config/cloudinary.js';

const router = Router();

router.route('/')
  .get(getDestinations)
  .post(upload.single('image'), createDestination);

router.route('/:id')
  .get(getDestination)
  .put(upload.single('image'), updateDestination)
  .delete(deleteDestination);

export default router;
