import mongoose from 'mongoose'

const leaveScheme = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    employee: {
      type: String,
      required : true,
    },
    leave: {
      type: String,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const LeaveModel = mongoose.model('Leave', leaveScheme)
export default LeaveModel
