import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chat",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,
  isChatAreaExpanded: false,

  toggleChatArea: () =>
    set((state) => ({ isChatAreaExpanded: !state.isChatAreaExpanded })),

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  setActiveTab: (tab) =>
    set({
      activeTab: tab,
    }),

  setSelectedUser: (user) => set({ selectedUser: user }),

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get("messages/contacts");
      set({ allContacts: response.data });
    } catch (error) {
      toast.error(error.response?.data?.messages || "Error fetching contacts");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get("messages/conversations");
      set({ chats: response.data });
    } catch (error) {
      toast.error(
        error.response?.data?.messages || "Error fetching conversations"
      );
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`messages/conversations/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.messages || "Error fetching messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const { authUser } = useAuthStore.getState();

    const tempId = `temp-${Date.now()}`;
    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isSending: true,
    };

    set({ messages: messages.concat(optimisticMessage) });

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({
        messages: messages.concat(res.data),
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      //remove optimistic messages if fail
      set({
        messages: messages.filter((msg) => msg._id !== tempId),
      });
    }
  },
}));
