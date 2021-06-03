import asyncHandler from 'express-async-handler'
import WriteUpModel from '../models/writeUpModel.js'

export const getWriteUp = asyncHandler(async (req, res) => {
  const writeup = await WriteUpModel.find({})
    .sort({ createdAt: -1 })
    .populate({
      path: 'employee',
      populate: {
        path: 'department',
      },
    })
  res.json(writeup)
})

export const postWriteUp = asyncHandler(async (req, res) => {
  const {
    employee,
    offenseCommitted,
    offenseCommittedDetails,
    actionPlan,
  } = req.body
  const user = req.user.id

  let Write = new WriteUpModel({
    user,
    employee,
    offenseCommitted,
    offenseCommittedDetails,
    actionPlan,
  })
  const writeUp = await Write.save()

  if (writeUp) {
    res.status(201).json(writeUp)
  } else {
    res.status(400)
    throw new Error('Internal Server Error')
  }
})

export const putWriteUp = asyncHandler(async (req, res) => {
  const {
    employee,
    offenseCommitted,
    offenseCommittedDetails,
    actionPlan,
  } = req.body
  const user = req.user.id

  let WriteUp = await WriteUpModel.findById(req.params.id)

  if (WriteUp) {
    WriteUp.employee = employee
    WriteUp.offenseCommitted = offenseCommitted
    WriteUp.offenseCommittedDetails = offenseCommittedDetails
    WriteUp.actionPlan = actionPlan
    WriteUp.user = user
  }

  const write = await WriteUp.save()

  if (write) {
    res.status(201).json(write)
  } else {
    res.status(400)
    throw new Error('Internal Server Error')
  }
})

export const deleteWriteUp = asyncHandler(async (req, res) => {
  const WriteUp = await WriteUpModel.findOneAndRemove({
    _id: req.params.id,
  })

  if (WriteUp) {
    res.json(WriteUp)
  } else {
    res.status(400)
    throw new Error('Invalid ID')
  }
})
