import { StateCreator } from "zustand";
import { App } from "@/types";

const appStore: StateCreator<App> = (set, get) => ({
  sidebarVisibility: false,
  toggleSidebarVisibility() {
    const visibility = get().sidebarVisibility;
    set(() => ({
      sidebarVisibility: !visibility,
    }));
  },
});
export default appStore;
