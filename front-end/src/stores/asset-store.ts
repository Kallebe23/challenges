import { CompanyAsset } from "@/types/assets";
import { create } from "zustand";

interface AssetState {
  selectedAsset: CompanyAsset | null;
  selectAsset: (asset: CompanyAsset | null) => void;
}

export const useAsset = create<AssetState>((set) => ({
  selectedAsset: null,
  selectAsset: (selectedAsset) => set({ selectedAsset }),
}));
