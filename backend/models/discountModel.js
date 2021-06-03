import mongoose from 'mongoose'

const discountScheme = mongoose.Schema(
  {
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    empId: {
      type: String,
      required: true,
    },
    empName: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
    },
    motherName: {
      type: String,
    },
    isSingle: {
      type: Boolean,
      required: true,
    },
    isMale: {
      type: Boolean,
      required: true,
    },
    wives: {
      type: [String],
    },
    husband: {
      type: String,
    },
    hasChildren: {
      type: Boolean,
      required: true,
    },
    children: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
)

const DiscountModel = mongoose.model('Discount', discountScheme)
export default DiscountModel
