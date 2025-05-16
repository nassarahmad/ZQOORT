import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  members: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    role: {
      type: String,
      enum: ["member", "admin"],
      default: "member"
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const Group = mongoose.model("Group", groupSchema);

export default Group;