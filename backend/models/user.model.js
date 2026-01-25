import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: { type: String, required: true },
    lastname: { type: String }
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }
});

/* Hash password */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/* Compare password */
userSchema.methods.comparePassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

/* JWT */
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};

export default mongoose.model("User", userSchema);
