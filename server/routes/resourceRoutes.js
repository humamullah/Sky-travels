import { Router } from 'express';
import {
  getResources,
  getResourceBySlug,
  createResource,
  updateResource,
  deleteResource,
} from '../controllers/resourceController.js';
import validate from '../middleware/validate.js';
import { createResourceSchema, updateResourceSchema } from '../validation/resourceValidation.js';

const router = Router();

router.route('/')
  .get(getResources)
  .post(validate(createResourceSchema), createResource);

router.route('/:slug')
  .get(getResourceBySlug)
  .put(validate(updateResourceSchema), updateResource)
  .delete(deleteResource);

export default router;
