import create from "zustand";

export const socketStore = create(() => ({
  socket: null,
}));

export const monitoringStore = create(() => ({
  isMonitoring: false,
}));

export const userEmailStore = create(() => ({
  userEmail: null,
}));
