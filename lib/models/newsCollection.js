import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    author: { type: String, required: true },
    category: String,
    thumbnailPath: String,
    featured: { type: Boolean, default: false },
    publishedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true, collection: 'newscollection' }
);

export default mongoose.models.newscollection ||
  mongoose.model('newscollection', NewsSchema);
