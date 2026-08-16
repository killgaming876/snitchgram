import { create } from "zustand";

type UIState = {
  activeNav: string;
  introSeen: boolean;
  audioEnabled: boolean;
  mobileNavOpen: boolean;
  setActiveNav: (value: string) => void;
  setIntroSeen: (value: boolean) => void;
  toggleAudio: () => void;
  setMobileNavOpen: (value: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
  activeNav: "home",
  introSeen: false,
  audioEnabled: false,
  mobileNavOpen: false,
  setActiveNav: (activeNav) => set({ activeNav }),
  setIntroSeen: (introSeen) => set({ introSeen }),
  toggleAudio: () => set((s) => ({ audioEnabled: !s.audioEnabled })),
  setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen })
}));
