import { create } from "zustand";

interface DeviceState {
  is_connected: boolean;
  setIsConnected: (is_connected: boolean) => void;
}

export const useDeviceStore = create<DeviceState>()((set) => ({
  is_connected: false,
  setIsConnected: (is_connected: boolean) =>
    set({
      is_connected: is_connected,
    }),
}));
