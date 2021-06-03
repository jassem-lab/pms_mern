import express from 'express'
import {
  deleteLeave,
  getLeave,
  postLeave,
  putLeave,
} from '../controllers/leaveController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, postLeave).get(protect, getLeave)
router.route('/:id').delete(protect, deleteLeave).put(protect, putLeave)

export default router
