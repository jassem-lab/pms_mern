import express from 'express'
import {
  deleteEmployee,
  getEmployee,
  postEmployee,
  putEmployee,
} from '../controllers/employeeController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, postEmployee).get(protect, getEmployee)
router.route('/:id').delete(protect, deleteEmployee).put(protect, putEmployee)

export default router
