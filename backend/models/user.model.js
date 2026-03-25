import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: { type: String, required: true },
    lastname: { type: String }
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  socketId: {
    type: String,
    default: null
  },
  socketConnectionCount: {
    type: Number,
    default: 0
  }
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});


userSchema.methods.comparePassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h"
  });
};

export default mongoose.model("User", userSchema);
