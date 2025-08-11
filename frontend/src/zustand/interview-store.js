// interviewStore.js
import { create } from "zustand";

const useInterviewStore = create((set) => ({
  currentInterviewId: null,
  setCurrentInterviewId: (id) => set({ currentInterviewId: id }),

  conversation: [],
  addMessage: (message) =>
    set((state) => ({ conversation: [...state.conversation, message] })),

  interviewStatus: false, // true || false
  setInterviewStatus: (status) => set({ interviewStatus: status }),

  result: null,
  setResult: (data) => set({ result: data }),

  clearInterview: () =>
    set({
      currentInterviewId: null,
      conversation: [],
      interviewStatus: false,
      result: null,
    }),
}));

export default useInterviewStore;
