import express from 'express';
import {
  getAllVisitors,
  getVisitorById,
  createVisitor,
  updateVisitor,
  checkOutVisitor,
  deleteVisitor,
  getVisitorStats,
  seedSampleVisitors,
} from '../controllers/visitorController.js';

const router = express.Router();

// Stats route (must be before :id)
router.get('/stats', getVisitorStats);

// Seed sample records
router.post('/seed', seedSampleVisitors);

// CRUD routes
router.route('/')
  .get(getAllVisitors)
  .post(createVisitor);

router.route('/:id')
  .get(getVisitorById)
  .put(updateVisitor)
  .delete(deleteVisitor);

// Quick check-out action
router.patch('/:id/checkout', checkOutVisitor);

export default router;
