import create from "zustand";

const useStore = create((set) => ({
  socket: null,
  setSocket: (socket) => set(() => ({ socket })),
  isMonitoring: false,
  toggleMonitoring: () => set((state) => ({ isMonitoring: !state.isMonitoring })),
  setMonitoring: (isMonitoring) => set(() => ({ isMonitoring })),
  userEmail: null,
  setUserEmail: (userEmail) => set(() => ({ userEmail })),
  isAlert: false,
  setToggleAlert: (isAlert) => set(() => ({ isAlert })),
}));

export default useStore;
