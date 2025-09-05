import { create } from "zustand";

// This will contain all the previous interviews of a user
const useUserStore = create((set) => ({
  previousInterviews: [],
  setPreviousInterviews: (interviews) =>
    set({ previousInterviews: interviews }),
}));

export default useUserStore;
