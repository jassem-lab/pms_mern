import mongoose from 'mongoose'

const resignScheme = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    resignDate: {
      type: Date,
      required: true,
    },
    resignType: {
      type: String,
      required: true,
    },
    resignReason: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const ResignModel = mongoose.model('Resign', resignScheme)
export default ResignModel
