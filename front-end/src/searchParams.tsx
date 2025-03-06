import {
  createLoader,
  parseAsString,
  createSearchParamsCache,
  createSerializer,
} from "nuqs/server";

export const filterSearchParams = {
  filter: parseAsString.withDefault(""),
};

export const loadSearchParams = createLoader(filterSearchParams);

export const searchParamsCache = createSearchParamsCache(filterSearchParams);

export const serialize = createSerializer(filterSearchParams);
