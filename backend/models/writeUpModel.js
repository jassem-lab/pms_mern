import mongoose from 'mongoose'

const writeUpScheme = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
    },
    offenseCommitted: {
      type: String,
      required: true,
    },
    offenseCommittedDetails: {
      type: String,
      required: true,
    },
    actionPlan: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const WriteUpModel = mongoose.model('WriteUp', writeUpScheme)
export default WriteUpModel
