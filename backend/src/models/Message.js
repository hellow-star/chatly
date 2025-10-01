import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    trim: true,
    maxlength: 1000,
  },
  image: {
    type: String, // URL or path to the image
  },
}, {
  timestamps: true
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
