import {
  AssetStatus,
  CompanyAsset,
  CompanyLocation,
  SensorType,
} from "@/types/assets";

export type TreeItem = {
  id: string;
  name: string;
  parentId: string | null;

  locationId?: string | null;
  sensorType?: SensorType | null;
  status?: AssetStatus | null;
};

export type Tree = {
  item: TreeItem;
  children: Tree;
  type: "asset" | "component" | "location";
}[];

export function recursiveTreeFilter(tree: Tree, filter: string): Tree {
  return tree
    .filter(
      ({ item, children }) =>
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        !!recursiveTreeFilter(children, filter).length
    )
    .map(({ children, ...rest }) => ({
      ...rest,
      children: recursiveTreeFilter(children, filter),
    }));
}

export function mountTree(
  locations: CompanyLocation[],
  assets: CompanyAsset[]
) {
  const getChildren = (parentId: string): Tree => {
    const locationsTree: Tree = locations
      .filter((location) => location.parentId === parentId)
      .map((location) => ({
        item: location,
        children: getChildren(location.id),
        type: "location",
      }));

    const assetsTree: Tree = assets
      .filter(
        (asset) => asset.parentId === parentId || asset.locationId === parentId
      )
      .map((asset) => ({
        item: asset,
        children: getChildren(asset.id),
        type: !!asset.sensorType ? "component" : "asset",
      }));

    return [...locationsTree, ...assetsTree];
  };

  const locationsTree: Tree = locations
    .filter((location) => !location.parentId)
    .map((location) => ({
      item: location,
      children: getChildren(location.id),
      type: "location",
    }));

  const assetsTree: Tree = assets
    .filter((asset) => !asset.parentId && !asset.locationId)
    .map((asset) => ({
      item: asset,
      children: getChildren(asset.id),
      type: asset.sensorType ? "component" : "asset",
    }));

  return [...locationsTree, ...assetsTree];
}
