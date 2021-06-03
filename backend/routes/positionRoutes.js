import express from 'express'
import {
  deletePosition,
  getPosition,
  postPosition,
  putPosition,
} from '../controllers/positionController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, postPosition).get(getPosition)
router.route('/:id').delete(protect, deletePosition).put(protect, putPosition)

export default router
