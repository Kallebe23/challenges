"use client";

import { selectionSearchParams } from "@/searchParams";
import { useQueryStates } from "nuqs";

export function useSelectedAsset() {
  return useQueryStates(selectionSearchParams);
}
