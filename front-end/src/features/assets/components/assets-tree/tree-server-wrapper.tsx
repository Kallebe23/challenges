import { mountTree } from "../../utils/tree";
import { searchParamsCache } from "@/searchParams";
import VirtualizedTree from "./virtualized-tree";
import {
  getCompanyAssets,
  getCompanyLocations,
} from "@/services/tractian-fake-api";
import { AssetStatus, SensorType } from "@/types/assets";

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

  const filteredLocations = locations.filter((location) => {
    let isValid = true;
    if (filter && !location.name.toLowerCase().includes(filter.toLowerCase())) {
      isValid = false;
    }
    return isValid;
  });

  const filteredAssets = assets.filter((asset) => {
    let isValid = true;
    if (filter && !asset.name.toLowerCase().includes(filter.toLowerCase())) {
      isValid = false;
    }

    if (onlyCritical && asset.status !== AssetStatus.alert) {
      isValid = false;
    }

    if (onlyEnergySensors && asset.sensorType !== SensorType.energy) {
      isValid = false;
    }

    return isValid;
  });

  const hasFilter = !!filter || onlyCritical || onlyEnergySensors;

  const tree = mountTree(filteredLocations, filteredAssets, hasFilter);

  return <VirtualizedTree tree={tree} />;
}
