import express from 'express'
import {
  deleteResign,
  getResign,
  postResign,
  putResign,
} from '../controllers/resignController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, postResign).get(getResign)
router.route('/:id').delete(protect, deleteResign).put(protect, putResign)

export default router
