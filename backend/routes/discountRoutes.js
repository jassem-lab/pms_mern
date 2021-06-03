import express from 'express'
import {
  deleteDiscount,
  getDiscount,
  postDiscount,
  putDiscount,
} from '../controllers/discountController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(postDiscount).get(getDiscount)
router.route('/:id').delete(protect, deleteDiscount).put(protect, putDiscount)

export default router
