import mongoose from 'mongoose'

const positionScheme = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const PositionModel = mongoose.model('Position', positionScheme)
export default PositionModel
