import asyncHandler from 'express-async-handler'
import ResignModel from '../models/resignModel.js'
import EmployeeModel from '../models/employeeModel.js'

export const getResign = asyncHandler(async (req, res) => {
  const resign = await ResignModel.find({})
    .sort({ createdAt: -1 })
    .populate({ path: 'employee', populate: { path: 'department' } })
  res.json(resign)
})

export const postResign = asyncHandler(async (req, res) => {
  const user = req.user.id
  const { employee, resignDate, resignType, resignReason } = req.body

  let resign = await ResignModel.findOne({ employee })
  let emp = await EmployeeModel.findById(employee)

  if (resign) {
    res.status(400)
    throw new Error('This employee already resigned')
  }

  resign = new ResignModel({
    user,
    employee,
    resignDate,
    resignType,
    resignReason,
  })
  const resi = await resign.save()

  if (emp) {
    emp.active = false
    emp.save()
  }

  if (resi) {
    res.status(201).json(resi)
  } else {
    res.status(400)
    throw new Error('Internal Server Error')
  }
})

export const putResign = asyncHandler(async (req, res) => {
  const user = req.user.id
  const { employee, resignDate, resignType, resignReason } = req.body

  let resign = await ResignModel.findById(req.params.id)

  if (resign) {
    resign.user = user
    resign.employee = employee
    resign.resignDate = resignDate
    resign.resignType = resignType
    resign.resignReason = resignReason
  }

  const resi = await resign.save()

  if (resi) {
    res.status(201).json(resi)
  } else {
    res.status(400)
    throw new Error('Internal Server Error')
  }
})

export const deleteResign = asyncHandler(async (req, res) => {
  const resign = await ResignModel.findById(req.params.id)

  if (resign) {
    let employee = await EmployeeModel.findById(resign.employee)
    if (employee) {
      employee.active = true
      employee.save()
    }
  }

  const resi = resign.remove()

  if (resi) {
    res.json(resi)
  } else {
    res.status(400)
    throw new Error('Invalid ID')
  }
})
