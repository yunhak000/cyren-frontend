import create from "zustand";
import dayjs from "dayjs";

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
  date: dayjs().format("YYYY-MM-DD"),
  setDate: (date) => set(() => ({ date })),
  photos: [],
  setPhotos: (photos) => set(() => ({ photos })),
  photoUrl: null,
  setPhotoUrl: (photoUrl) => set(() => ({ photoUrl })),
  isShowPhotoDetail: false,
  setIsShowPhotoDetail: (isShowPhotoDetail) => set(() => ({ isShowPhotoDetail })),
  token: null,
  setToken: (token) => set(() => ({ token })),
}));

export default useStore;
