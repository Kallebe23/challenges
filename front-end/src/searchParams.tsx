import {
  createLoader,
  parseAsString,
  createSearchParamsCache,
  createSerializer,
  parseAsBoolean,
} from "nuqs/server";

export const filterSearchParams = {
  filter: parseAsString.withDefault(""),
  onlyEnergySensors: parseAsBoolean.withDefault(false),
  onlyCritical: parseAsBoolean.withDefault(false),
};

export const selectionSearchParams = {
  asset: parseAsString.withDefault(""),
};

export const loadSearchParams = createLoader({
  ...filterSearchParams,
  ...selectionSearchParams,
});

export const searchParamsCache = createSearchParamsCache({
  ...filterSearchParams,
  ...selectionSearchParams,
});

export const serialize = createSerializer({
  ...filterSearchParams,
  ...selectionSearchParams,
});
