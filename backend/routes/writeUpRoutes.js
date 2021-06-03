import express from 'express'
import {
  deleteWriteUp,
  getWriteUp,
  postWriteUp,
  putWriteUp,
} from '../controllers/writeUpController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, postWriteUp).get(protect, getWriteUp)
router.route('/:id').delete(protect, deleteWriteUp).put(protect, putWriteUp)

export default router
