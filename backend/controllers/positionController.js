import asyncHandler from 'express-async-handler'
import PositionModel from '../models/positionModel.js'

export const getPosition = asyncHandler(async (req, res) => {
  const position = await PositionModel.find({}).sort({ createdAt: -1 })
  res.json(position)
})

export const postPosition = asyncHandler(async (req, res) => {
  const user = req.user.id
  const name = req.body.name

  let position = await PositionModel.findOne({ name })

  if (position) {
    if (position.name.toLowerCase() === name.toLowerCase()) {
      res.status(400)
      throw new Error('Position already exists')
    }
  }

  position = new PositionModel({
    user,
    name,
  })
  const dep = await position.save()

  if (dep) {
    res.status(201).json(dep)
  } else {
    res.status(400)
    throw new Error('Internal Server Error')
  }
})

export const putPosition = asyncHandler(async (req, res) => {
  const user = req.user.id
  const name = req.body.name

  let position = await PositionModel.findById(req.params.id)

  if (position) {
    position.name = name
    position.user = user
  }

  const dep = await position.save()

  if (dep) {
    res.status(201).json(dep)
  } else {
    res.status(400)
    throw new Error('Internal Server Error')
  }
})

export const deletePosition = asyncHandler(async (req, res) => {
  const position = await PositionModel.findOneAndRemove({
    _id: req.params.id,
  })

  if (position) {
    res.json(position)
  } else {
    res.status(400)
    throw new Error('Invalid ID')
  }
})
