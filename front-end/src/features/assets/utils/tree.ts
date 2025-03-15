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

type TreeNode = {
  item: TreeItem;
  expanded: boolean;
  children: Tree;
  type: TreeItemType;
};

export type Tree = TreeNode[];

type Filters = {
  name: string;
  onlyCritical: boolean;
  onlyEnergySensors: boolean;
};

// only apply filters
const isItemValid = (item: TreeItem, filters: Filters) => {
  const { name, onlyCritical, onlyEnergySensors } = filters;
  const lowerNameFilter = name.toLowerCase();

  const isNameValid = item.name.toLowerCase().includes(lowerNameFilter);

  let matches = isNameValid;

  if (onlyCritical && item.status !== AssetStatus.alert) {
    matches = false;
  }

  if (onlyEnergySensors && item.sensorType !== SensorType.energy) {
    matches = false;
  }

  return matches;
};

export function filterTree(tree: Tree, filters: Filters): Tree {
  return tree
    .map((treeNode) => {
      const isValid = isItemValid(treeNode.item, filters);

      if (isValid) {
        return {
          ...treeNode,
          expanded: false,
        };
      }

      const filteredChildren = filterTree(treeNode.children, filters);

      if (filteredChildren.length) {
        return {
          ...treeNode,
          children: filteredChildren,
        };
      }
      return null;
    })
    .filter(Boolean) as Tree;
}

export function mountTree(
  locations: CompanyLocation[],
  assets: CompanyAsset[],
  hasFilter?: boolean
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
      expanded: hasFilter,
      type: "location",
    }));

    const assetNodes = (assetMap.get(parentId) || []).map((asset) => ({
      item: asset,
      children: buildTree(asset.id),
      expanded: hasFilter,
      type: asset.sensorType ? "component" : "asset",
    }));

    return [...locationNodes, ...assetNodes] as Tree;
  };

  return buildTree();
}

export function toggleTreeItem(id: string, tree: Tree) {
  for (const treeItem of tree) {
    if (id === treeItem.item.id) {
      treeItem.expanded = !treeItem.expanded;
      break;
    }
    if (treeItem.expanded && treeItem.children.length) {
      toggleTreeItem(id, treeItem.children);
    }
  }

  return tree;
}

export type FlattenedTree = {
  item: TreeItem;
  type: TreeItemType;
  depth: number;
  hasChildren: boolean;
  expanded: boolean;
}[];

export function flattenTree(tree: Tree, depth = 0, result: FlattenedTree = []) {
  for (const { item, children, type, expanded } of tree) {
    result.push({
      item,
      type,
      depth,
      hasChildren: !!children.length,
      expanded,
    });

    if (children.length && expanded) {
      flattenTree(children, depth + 1, result);
    }
  }

  return result;
}
