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

export function recursiveTreeFilter(
  tree: Tree,
  filters: {
    name: string;
    onlyCritical: boolean;
    onlyEnergySensors: boolean;
  }
): Tree {
  const { name, onlyCritical, onlyEnergySensors } = filters;
  const lowerNameFilter = name.toLowerCase();

  return tree
    .map(({ children, ...rest }) => {
      const filteredChildren = recursiveTreeFilter(children, filters);
      const isNameValid = rest.item.name
        .toLowerCase()
        .includes(lowerNameFilter);

      let matches = isNameValid;

      if (onlyCritical && rest.item.status !== AssetStatus.alert) {
        matches = false;
      }

      if (onlyEnergySensors && rest.item.sensorType !== SensorType.energy) {
        matches = false;
      }

      if (filteredChildren.length > 0) {
        matches = true;
      }

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
