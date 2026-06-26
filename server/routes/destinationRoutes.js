import { Router } from 'express';
import {
  getDestinations,
  getDestinationBySlug,
  getDestinationCategories,
  createDestination,
  updateDestination,
  deleteDestination,
} from '../controllers/destinationController.js';
import { upload } from '../config/cloudinary.js';
import validate, { validateQuery } from '../middleware/validate.js';
import {
  createDestinationSchema,
  updateDestinationSchema,
  destinationQuerySchema,
} from '../validation/destinationValidation.js';

const router = Router();

router.get('/categories', getDestinationCategories);

router.route('/')
  .get(validateQuery(destinationQuerySchema), getDestinations)
  .post(upload.array('images', 10), validate(createDestinationSchema), createDestination);

router.route('/:slug')
  .get(getDestinationBySlug)
  .put(upload.array('images', 10), validate(updateDestinationSchema), updateDestination)
  .delete(deleteDestination);

export default router;
