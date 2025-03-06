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
  const filter = searchParamsCache.get("filter");
  const assetsPromise = getCompanyAssets(companyId);
  const locationsPromise = getCompanyLocations(companyId);

  const [assets, locations] = await Promise.all([
    assetsPromise,
    locationsPromise,
  ]);

  const tree = mountTree(locations, assets);
  const filteredTree = filter ? recursiveTreeFilter(tree, filter) : tree;

  return <VirtualizedTree tree={filteredTree} filter={filter} />;
}
