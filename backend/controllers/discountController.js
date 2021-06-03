import asyncHandler from 'express-async-handler'
import DiscountModel from '../models/discountModel.js'

export const getDiscount = asyncHandler(async (req, res) => {
  const discount = await DiscountModel.find({})
    .sort({ createdAt: -1 })
    .populate('department', ['name'])
  res.json(discount)
})

export const postDiscount = asyncHandler(async (req, res) => {
  const empId = req.body.empId.toUpperCase()
  const {
    empName,
    department,
    fatherName,
    motherName,
    isSingle,
    isMale,
    wives,
    husband,
    hasChildren,
    children,
  } = req.body

  let discount = await DiscountModel.findOne({ empId })

  if (discount) {
    res.status(400)
    throw new Error('Already filled the form')
  }

  discount = new DiscountModel({
    empId,
    empName,
    department,
    fatherName,
    motherName,
    isSingle,
    isMale,
    wives: Array.isArray(wives)
      ? wives
      : wives.split(',').map((wife) => '' + wife.trim()),
    husband,
    hasChildren,
    children: Array.isArray(children)
      ? children
      : children.split(',').map((child) => '' + child.trim()),
  })
  const dis = await discount.save()

  if (dis) {
    res.status(201).json(dis)
  } else {
    res.status(400)
    throw new Error('Internal Server Error')
  }
})

export const putDiscount = asyncHandler(async (req, res) => {
  const empId = req.body.empId.toUpperCase()

  const {
    empName,
    department,
    fatherName,
    motherName,
    isSingle,
    isMale,
    wives,
    husband,
    hasChildren,
    children,
  } = req.body

  let discount = await DiscountModel.findById(req.params.id)

  if (discount) {
    discount.empName = empName
    discount.department = department
    discount.fatherName = fatherName
    discount.motherName = motherName
    discount.isSingle = isSingle
    discount.isMale = isMale
    discount.wives = Array.isArray(wives)
      ? wives
      : wives.split(',').map((wife) => '' + wife.trim())
    discount.husband = husband
    discount.hasChildren = hasChildren
    discount.children = Array.isArray(children)
      ? children
      : children.split(',').map((child) => '' + child.trim())
  }

  const dis = await discount.save()

  if (dis) {
    res.status(201).json(dis)
  } else {
    res.status(400)
    throw new Error('Internal Server Error')
  }
})

export const deleteDiscount = asyncHandler(async (req, res) => {
  const discount = await DiscountModel.findOneAndRemove({
    _id: req.params.id,
  })

  if (discount) {
    res.json(discount)
  } else {
    res.status(400)
    throw new Error('Invalid ID')
  }
})
