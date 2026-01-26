import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 // auto delete after 24 hours
  }
});

export default mongoose.model("blacklistToken", blacklistTokenSchema);
