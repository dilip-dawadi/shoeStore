import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserDetails",
  },
  firstName: {
    type: String,
    required: [true, "Please enter your full name"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter your full name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
  },
  comment: {
    type: String,
    required: [true, "Please enter your comment"],
  },
  isResolved: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Contact = mongoose.model("ContactUs", contactSchema);

export default Contact;
