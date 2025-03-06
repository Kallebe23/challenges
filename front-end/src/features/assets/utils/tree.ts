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

export type TreeItemType = "asset" | "component" | "location";

export type Tree = {
  item: TreeItem;
  children: Tree;
  type: TreeItemType;
}[];

export function recursiveTreeFilter(tree: Tree, filter: string): Tree {
  const lowerFilter = filter.toLowerCase();

  return tree
    .map(({ children, ...rest }) => {
      const filteredChildren = recursiveTreeFilter(children, filter);
      const matches =
        rest.item.name.toLowerCase().includes(lowerFilter) ||
        filteredChildren.length > 0;

      return matches
        ? {
            ...rest,
            children: filteredChildren,
          }
        : null;
    })
    .filter(Boolean) as Tree;
}

export function mountTree(
  locations: CompanyLocation[],
  assets: CompanyAsset[]
): Tree {
  const locationMap = new Map<string, CompanyLocation[]>();
  const assetMap = new Map<string, CompanyAsset[]>();

  for (const location of locations) {
    if (!locationMap.has(location.parentId || "")) {
      locationMap.set(location.parentId || "", []);
    }
    locationMap.get(location.parentId || "")!.push(location);
  }

  for (const asset of assets) {
    const key = asset.parentId || asset.locationId || "";
    if (!assetMap.has(key)) {
      assetMap.set(key, []);
    }
    assetMap.get(key)!.push(asset);
  }

  const buildTree = (parentId: string = ""): Tree => {
    const locationNodes = (locationMap.get(parentId) || []).map((location) => ({
      item: location,
      children: buildTree(location.id),
      type: "location",
    }));

    const assetNodes = (assetMap.get(parentId) || []).map((asset) => ({
      item: asset,
      children: buildTree(asset.id),
      type: asset.sensorType ? "component" : "asset",
    }));

    return [...locationNodes, ...assetNodes] as Tree;
  };

  return buildTree();
}

export function flattenTree(
  tree: Tree,
  expanded?: Set<string>,
  depth = 0,
  result: {
    item: TreeItem;
    type: TreeItemType;
    hasChildren: boolean;
    depth: number;
  }[] = []
) {
  for (const { item, children, type } of tree) {
    result.push({ item, type, depth, hasChildren: !!children.length });

    if (!expanded || (item && expanded.has(item.id))) {
      flattenTree(children, expanded, depth + 1, result);
    }
  }

  return result;
}
