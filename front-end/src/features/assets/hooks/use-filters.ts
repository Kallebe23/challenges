"use client";

import { filterSearchParams } from "@/searchParams";
import { useQueryStates } from "nuqs";

export function useFilters() {
  return useQueryStates(filterSearchParams);
}
