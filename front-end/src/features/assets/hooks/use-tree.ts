import {
  AssetStatus,
  CompanyAsset,
  CompanyLocation,
  SensorType,
} from "@/types/assets";
import { useCallback, useMemo } from "react";

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

export function useTree(locations: CompanyLocation[], assets: CompanyAsset[]) {
  const getChildren = useCallback(
    (parentId: string): Tree => {
      const locationsTree: Tree = locations
        .filter((location) => location.parentId === parentId)
        .map((location) => ({
          item: location,
          children: getChildren(location.id),
          type: "location",
        }));

      const assetsTree: Tree = assets
        .filter(
          (asset) =>
            asset.parentId === parentId || asset.locationId === parentId
        )
        .map((asset) => ({
          item: asset,
          children: getChildren(asset.id),
          type: !!asset.sensorType ? "component" : "asset",
        }));

      return [...locationsTree, ...assetsTree];
    },
    [locations, assets]
  );

  return useMemo(() => {
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
  }, [locations, assets, getChildren]);
}
