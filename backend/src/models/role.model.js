import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  permissions: [{
    type: String,
    enum: ["create_group", "delete_group", "add_member", "remove_member", "send_message", "delete_message"]
  }],
  isDefault: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Role = mongoose.model("Role", roleSchema);

export default Role;