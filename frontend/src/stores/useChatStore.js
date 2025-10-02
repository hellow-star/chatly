import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import audioService from "../services/audioService";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chat",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: audioService.isSoundEnabledState(),
  isChatAreaExpanded: false,

  toggleChatArea: () =>
    set((state) => ({ isChatAreaExpanded: !state.isChatAreaExpanded })),

  toggleSound: () => {
    const newSoundState = audioService.toggleSound();
    set({ isSoundEnabled: newSoundState });
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

    set((state) => ({ messages: state.messages.concat(optimisticMessage) }));

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      const temporaryId = optimisticMessage._id;
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id === temporaryId ? res.data : msg
        ),
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      //remove optimistic messages if fail
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== tempId),
      }));
    }
  },

  // Store the message listener function to allow proper cleanup
  _messageListener: null,

  subscribeToMessages: () => {
    const { selectedUser } = get();

    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    // Clean up any existing listener first
    if (get()._messageListener) {
      socket.off("newMessage", get()._messageListener);
    }

    // Create a new listener function
    const messageListener = (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) {
        console.debug("ChatStore: Ignoring message from non-selected user", newMessage.senderId);
        return;
      }

      console.debug("ChatStore: Adding new message to conversation", newMessage);
      const currentMessages = get().messages;
      set({ messages: [...currentMessages, newMessage] });
    };

    // Store the listener and attach it
    set({ _messageListener: messageListener });
    socket.on("newMessage", messageListener);
  },

  unSubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    const messageListener = get()._messageListener;

    if (messageListener) {
      socket.off("newMessage", messageListener);
      set({ _messageListener: null });
    }
  },
}));
