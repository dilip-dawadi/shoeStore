import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: { type: Boolean, default: false },
    wishlist: { type: Array, default: [] },
    cart: { type: Array, default: [] },
    number: { type: String },
    address: { type: String },
    verifiedUser: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const userDetail = mongoose.model("UserDetails", userSchema);

export default userDetail;
