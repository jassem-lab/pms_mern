import mongoose from 'mongoose'

const employeeScheme = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    employeeId: {
      type: String,
      required: true,
    },
    employeeName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    employmentType: {
      type: String,
      required: true,
    },
    hiredDate: {
      type: Date,
      required: true,
    },
    national: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    position: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Position',
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
    },
    document: {
      documentName: {
        type: String,
      },
      documentPath: {
        type: String,
      },
    },
    bankName: {
      type: String,
    },
    bankAccount: {
      type: Number,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

const EmployeeModel = mongoose.model('Employee', employeeScheme)
export default EmployeeModel
