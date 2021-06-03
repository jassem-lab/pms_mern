import asyncHandler from 'express-async-handler'
import LeaveModel from '../models/leaveModel.js'

export const getLeave = asyncHandler(async (req, res) => {
  const Leave = await LeaveModel.find({})
    .sort({ createdAt: -1 })
    .populate({
      path: 'employee',
      populate: {
        path: 'department',
      },
    })
  res.json(Leave)
})

export const postLeave = asyncHandler(async (req, res) => {
  const { employee, leave, start_date, end_date, description } = req.body
  const user = req.user.id

  if (end_date <= start_date) {
    res.status(400)
    throw new Error('Start date needs to be from the past')
  }

  let LeaveRequest = new LeaveModel({
    user,
    employee,
    leave,
    start_date,
    end_date,
    description,
  })
  const lea = await LeaveRequest.save()

  if (lea) {
    res.status(201).json(lea)
  } else {
    res.status(400)
    throw new Error('Internal Server Error')
  }
})

export const putLeave = asyncHandler(async (req, res) => {
  const { employee, leave, start_date, end_date, description } = req.body
  const user = req.user.id

  if (end_date <= start_date) {
    res.status(400)
    throw new Error('Start date needs to be from the past')
  }

  let LeaveRequest = await LeaveModel.findById(req.params.id)

  if (LeaveRequest) {
    LeaveRequest.employee = employee
    LeaveRequest.leave = leave
    LeaveRequest.start_date = start_date
    LeaveRequest.end_date = end_date
    LeaveRequest.description = description
    LeaveRequest.user = user
  }

  const lea = await LeaveRequest.save()

  if (lea) {
    res.status(201).json(lea)
  } else {
    res.status(400)
    throw new Error('Internal Server Error')
  }
})

export const deleteLeave = asyncHandler(async (req, res) => {
  const Leave = await LeaveModel.findOneAndRemove({
    _id: req.params.id,
  })

  if (Leave) {
    res.json(Leave)
  } else {
    res.status(400)
    throw new Error('Invalid ID')
  }
})
