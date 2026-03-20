import { create } from "zustand";
import { MediaKitData, TemplateId } from "@/types";

interface KittoStore {
  currentStep: 1 | 2 | 3;
  mediaKitData: MediaKitData;
  selectedTemplate: TemplateId;
  setStep: (step: 1 | 2 | 3) => void;
  setMediaKitData: (data: MediaKitData) => void;
  setSelectedTemplate: (template: TemplateId) => void;
}

const defaultMediaKitData: MediaKitData = {
  name: "",
  handle: "",
  niche: "",
  bio: "",
  location: "",
  profilePhoto: null,
  followers: "",
  engagementRate: "",
  reach: "",
  contentTypes: [],
  brands: "",
  email: "",
};

export const useKittoStore = create<KittoStore>((set) => ({
  currentStep: 1,
  mediaKitData: defaultMediaKitData,
  selectedTemplate: "clean",
  setStep: (step) => set({ currentStep: step }),
  setMediaKitData: (data) => set({ mediaKitData: data }),
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
}));
