import TreeOption from "./tree-option";
import { mountTree, recursiveTreeFilter } from "../../utils/tree";
import {
  getCompanyAssets,
  getCompanyLocations,
} from "@/services/tractian-fake-api";
import { searchParamsCache } from "@/searchParams";

export default async function TreeStructure({
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

  return (
    <ul className="tree">
      {filteredTree.map(({ children, item, type }) => (
        <li key={item.id}>
          <TreeOption item={item} type={type} subItems={children} />
        </li>
      ))}
    </ul>
  );
}
