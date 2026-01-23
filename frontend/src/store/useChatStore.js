import { create } from "zustand";
import toast from "react-hot-toast";
import  {axiosInstance }from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/message/sent/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.message);
    }
  },

  subscribeToMessages: () => {
  const { selectedUser } = get();
  const socket = useAuthStore.getState().socket;

  if (!selectedUser || !socket) return;

  socket.off("newMessage"); // prevent duplicate listeners

  socket.on("newMessage", (newMessage) => {
    if (newMessage.senderId !== selectedUser._id) return;

    set({
      messages: [...get().messages, newMessage],
    });
  });
},


  unsubscribeFromMessages: () => {
  const socket = useAuthStore.getState().socket;
  if (!socket) return;

  socket.off("newMessage");
},


  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
