// import { getAssets } from "../../api/assets";
// import { getLocations } from "../../api/locations";
import { mountTree, recursiveTreeFilter } from "../../utils/tree";
import { searchParamsCache } from "@/searchParams";
import VirtualizedTree from "./virtualized-tree";
import {
  getCompanyAssets,
  getCompanyLocations,
} from "@/services/tractian-fake-api";

export default async function TreeServerWrapper({
  companyId,
}: {
  companyId: string;
}) {
  const { filter, onlyCritical, onlyEnergySensors } = searchParamsCache.all();

  const assetsPromise = getCompanyAssets(companyId);
  const locationsPromise = getCompanyLocations(companyId);

  const [assets, locations] = await Promise.all([
    assetsPromise,
    locationsPromise,
  ]);

  const hasFilter = !!filter || onlyCritical || onlyEnergySensors;

  const tree = mountTree(locations, assets, hasFilter);
  const filteredTree = recursiveTreeFilter(tree, {
    name: filter,
    onlyCritical,
    onlyEnergySensors,
  });

  return <VirtualizedTree tree={filteredTree} />;
}
