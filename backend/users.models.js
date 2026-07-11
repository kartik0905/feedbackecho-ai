import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /.+@geu\.ac\.in$/,
        "Only @geu.ac.in email addresses are allowed.",
      ],
    },
    password: { type: String }, // Optional for OAuth users
    googleId: { type: String },
  },
  { timestamps: true },
);

// Hash password before saving to database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to verify passwords during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
