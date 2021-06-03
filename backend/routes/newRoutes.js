import express from 'express';
import {
  deleteNews,
  getNews,
  postNews,
  putNews,
} from '../controllers/newsController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').post(protect, postNews).get(protect, getNews);
router.route('/:id').delete(protect, deleteNews).put(protect, putNews);

export default router;
