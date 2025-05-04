import { create } from "zustand";

interface ImageStore {
  imageSrc: string | null;
  setImageSrc: (src: string) => void;
  clearImageSrc: () => void;
}

export const useImageStore = create<ImageStore>((set) => ({
  imageSrc: null,
  setImageSrc: (src) => set({ imageSrc: src }),
  clearImageSrc: () => set({ imageSrc: null }),
}));
