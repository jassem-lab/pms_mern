import asyncHandler from 'express-async-handler'
import EmployeeModel from '../models/employeeModel.js'
import ResignModel from '../models/resignModel.js'
import LeaveModel from '../models/leaveModel.js'
import WriteUpModel from '../models/writeUpModel.js'
import fs from 'fs'
import path from 'path'
const __dirname = path.resolve()

export const getEmployee = asyncHandler(async (req, res) => {
  const Employee = await EmployeeModel.find({})
    .sort({ createdAt: -1 })
    .populate('department', ['name'])
    .populate('position', ['name'])
  res.json(Employee)
})

export const postEmployee = asyncHandler(async (req, res) => {
  const {
    employeeName,
    gender,
    mobile,
    employmentType,
    hiredDate,
    national,
    birthday,
    position,
    address,
    email,
    department,
    bankName,
    bankAccount,
  } = req.body
  const employeeId = req.body.employeeId.toUpperCase()
  const user = req.user.id
  const document = req.files && req.files.document

  if (!document) {
    res.status(400)
    throw new Error('Please, upload a document')
  }

  const documentFullName = document && document.name.split('.').shift()
  const documentExtension = document && document.name.split('.').pop()
  const documentName =
    document && `${documentFullName}-${Date.now()}.${documentExtension}`
  const documentPath = `/uploads/${documentName}`

  const allowedExtensions = /(\.pdf|\.docx|\.doc)$/i

  if (document) {
    if (!allowedExtensions.exec(document && documentName)) {
      res.status(400)
      throw new Error('Invalid document type')
    }
  }

  let employee = await EmployeeModel.findOne({ employeeId })

  if (employee) {
    res.status(400)
    throw new Error('Employee already exists')
  }

  document.mv(path.join(__dirname, documentPath), (err) => {
    if (err) {
      res.status(500)
      throw new Error(err)
    }
  })

  const documentData = {
    documentName,
    documentPath,
  }

  employee = new EmployeeModel({
    user,
    employeeId,
    employeeName,
    gender,
    mobile,
    employmentType,
    hiredDate,
    national,
    birthday,
    position,
    address,
    email,
    department,
    active: true,
    document: documentData,
    bankName,
    bankAccount,
  })
  const emp = await employee.save()

  if (emp) {
    res.status(201).json(emp)
  } else {
    res.status(400)
    throw new Error('Internal Server Error')
  }
})

export const putEmployee = asyncHandler(async (req, res) => {
  const {
    employeeName,
    gender,
    mobile,
    employmentType,
    hiredDate,
    national,
    birthday,
    position,
    address,
    email,
    department,
    active,
    bankName,
    bankAccount,
  } = req.body
  const employeeId = req.body.employeeId.toUpperCase()
  const user = req.user.id
  const document = req.files && req.files.document

  const documentFullName = document && document.name.split('.').shift()
  const documentExtension = document && document.name.split('.').pop()
  const documentName =
    document && `${documentFullName}-${Date.now()}.${documentExtension}`
  const documentPath = `/uploads/${documentName}`

  const allowedExtensions = /(\.pdf|\.docx|\.doc)$/i

  if (document) {
    if (!allowedExtensions.exec(document && documentName)) {
      res.status(400)
      throw new Error('Invalid document type')
    }
  }

  let employee = await EmployeeModel.findById(req.params.id)

  if (employee) {
    employee.document.documentPath &&
      req.files &&
      req.files.document &&
      fs.unlink(path.join(__dirname, employee.document.documentPath), (err) => {
        if (err) {
          res.status(500)
          throw new Error(err)
        }
      })
  }

  if (employee) {
    document &&
      document.mv(path.join(__dirname, documentPath), (err) => {
        if (err) {
          res.status(500)
          throw new Error(err)
        }
      })
  }
  const documentData = document && {
    documentName,
    documentPath,
  }

  if (employee) {
    if (document) {
      employee.user = user
      employee.employeeId = employeeId
      employee.employeeName = employeeName
      employee.gender = gender
      employee.mobile = mobile
      employee.employmentType = employmentType
      employee.hiredDate = hiredDate
      employee.national = national
      employee.birthday = birthday
      employee.position = position
      employee.address = address
      employee.email = email
      employee.department = department
      employee.active = active
      employee.document = document && documentData
      employee.bankName = bankName
      employee.bankAccount = bankAccount
    }
    if (document === null) {
      employee.user = user
      employee.employeeId = employeeId
      employee.employeeName = employeeName
      employee.gender = gender
      employee.mobile = mobile
      employee.employmentType = employmentType
      employee.hiredDate = hiredDate
      employee.national = national
      employee.birthday = birthday
      employee.position = position
      employee.address = address
      employee.email = email
      employee.department = department
      employee.active = active
      employee.bankName = bankName
      employee.bankAccount = bankAccount
    }

    const updatedEmployee = await employee.save()
    res.status(201).json(updatedEmployee)
  } else {
    res.status(404)
    throw new Error('Employee not found')
  }
})

export const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id)

  if (employee) {
    fs.unlink(path.join(__dirname, employee.document.documentPath), (err) => {
      if (err) {
        res.status(500)
        throw new Error(err)
      }
    })

    await ResignModel.deleteOne({ employee: employee._id })
    await LeaveModel.deleteOne({ employee: employee._id })
    await WriteUpModel.deleteOne({ employee: employee._id })
    await employee.deleteOne()

    res.json(employee)
  } else {
    res.status(400)
    throw new Error('Invalid ID')
  }
})
