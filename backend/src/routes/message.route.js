import express from "express";
import {
  getAllContacts,
  getAllConversations,
  getConversationWithContact,
  sendMessageToContact,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protectRoute);

//get contacts and conversations
router.get("/contacts", getAllContacts);
router.get("/conversations", getAllConversations);
router.get("/conversations/:contactId", getConversationWithContact);

//send message to contact
router.post("/send/:contactId", sendMessageToContact);

export default router;
