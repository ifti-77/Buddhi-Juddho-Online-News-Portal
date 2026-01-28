import mongoose from "mongoose";


const journalistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, default: "active" },
  },
  { timestamps: true, collection: 'journalists' }
);

export default mongoose.models.journalists ||
  mongoose.model('journalists', journalistSchema);