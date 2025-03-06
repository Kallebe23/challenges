import ComponentIcon from "@/assets/icons/component.png";
import LocationIcon from "@/assets/icons/location.svg";
import AssetIcon from "@/assets/icons/asset.svg";
import AlertStatusIcon from "@/assets/icons/alert-status.svg";
import OperatingStatusIcon from "@/assets/icons/operating-status.svg";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { TreeOptionProps } from "./tree-item";
import { AssetStatus } from "@/types/assets";

export const typeIcons: Record<TreeOptionProps["type"], StaticImport> = {
  location: LocationIcon,
  asset: AssetIcon,
  component: ComponentIcon,
};

export const statusIcons: Record<AssetStatus, StaticImport> = {
  alert: AlertStatusIcon,
  operating: OperatingStatusIcon,
};
