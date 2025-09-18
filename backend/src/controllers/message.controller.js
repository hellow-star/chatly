import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllContacts = async (req, res) => {
  try {
    // find everyone except the authenticated user
    const loggedinUserId = req.user.id;
    const contacts = await User.find({ _id: { $ne: loggedinUserId } }).select(
      "-password"
    );

    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllConversations = async (req, res) => {
  try {
    const loggedinUserId = req.user.id;

    const conversations = await Message.find({
      $or: [{ senderId: loggedinUserId }, { recipientId: loggedinUserId }],
    });

    const chatPartnerIds = [
      ...new Set(
        conversations.map((msg) =>
          msg.senderId.toString() === loggedinUserId
            ? msg.recipientId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    const chatPartners = await User.find({
      _id: { $in: chatPartnerIds },
    }).select("-password");
    res.status(200).json(chatPartners);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getConversationWithContact = async (req, res) => {
  try {
    const myId = req.user.id;
    const { contactId: userToChatId } = req.params;

    const conversation = await Message.find({
      $or: [
        { senderId: myId, recipientId: userToChatId },
        { senderId: userToChatId, recipientId: myId },
      ],
    }).sort({ timestamp: 1 }); // Sort by timestamp in ascending order
    res.status(200).json(conversation);
  } catch (error) {
    console.error("Error fetching conversation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessageToContact = async (req, res) => {
  try {
    const { text, image } = req.body;
    const senderId = req.user._id;
    const { contactId: recipientId } = req.params;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      recipientId,
      text,
      image: imageUrl,
    });

    const savedMessage = await newMessage.save();

    //todo: emit socket event here for real-time update
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
