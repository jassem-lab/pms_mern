import mongoose from 'mongoose';

const newsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model('News', newsSchema);
export default News;
