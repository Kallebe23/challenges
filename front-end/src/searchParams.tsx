import {
  createLoader,
  parseAsString,
  createSearchParamsCache,
  createSerializer,
} from "nuqs/server";

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const filterSearchParams = {
  filter: parseAsString.withDefault(""),
};

export const loadSearchParams = createLoader(filterSearchParams);

export const searchParamsCache = createSearchParamsCache(filterSearchParams);

// Create a serializer function by passing the description of the search params to accept
export const serialize = createSerializer(filterSearchParams);
