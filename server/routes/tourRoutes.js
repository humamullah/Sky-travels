import { Router } from 'express';
import { getTours, getTourBySlug, createTour, updateTour, deleteTour } from '../controllers/tourController.js';

const router = Router();

router.get('/', getTours);
router.post('/', createTour);
router.get('/:slug', getTourBySlug);
router.put('/:slug', updateTour);
router.delete('/:slug', deleteTour);

export default router;
