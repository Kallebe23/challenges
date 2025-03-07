"use client";
import Image from "next/image";

import EnergySensorIcon from "@/assets/icons/energy-sensor.svg";
import ArrowDownIcon from "@/assets/icons/arrow-down.svg";

import { SensorType } from "@/types/assets";
import { statusIcons, typeIcons } from "./asset-icons";
import { TreeItem, TreeItemType } from "../../utils/tree";
import { useMemo } from "react";
import { useSelectedAsset } from "../../hooks/use-selected-asset";
import SelectedComponentIcon from "@/assets/icons/component-selected.png";

export type TreeOptionProps = {
  type: "location" | "component" | "asset";
  item: TreeItem;
  hasChildren: boolean;
  depth: number;
  onClick: (id: string, type: TreeItemType) => void;
  expanded: Set<string>;
};

export default function TreeItemRow({
  type,
  item,
  depth,
  hasChildren,
  onClick,
  expanded,
}: TreeOptionProps) {
  const [{ asset }] = useSelectedAsset();

  const statusIcon = useMemo(
    () => (item.status ? statusIcons[item.status] : null),
    [item.status]
  );

  const isExpanded = useMemo(() => expanded.has(item.id), [expanded, item.id]);
  const leftPadding = depth * 24;

  const isSelected = asset === item.id;

  const typeIcon = useMemo(() => {
    if (isSelected) {
      return SelectedComponentIcon;
    }
    return typeIcons[type];
  }, [type, isSelected]);

  return (
    <li
      onClick={() => {
        onClick(item.id, type);
      }}
      className="tree-list-item"
      style={{
        color: isSelected ? "white" : "inherit",
        marginLeft: depth !== 0 ? 4 : 0,
        paddingLeft: leftPadding,
        position: "relative",
        background: isSelected ? "var(--color-primary)" : undefined,
        // borderLeft: depth !== 0 ? "1px solid #ddd" : "none",
      }}
    >
      {Array.from({ length: depth }).map((_, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            width: 12,
            height: "100%",
            borderLeft: "1px solid #ddd",
            left: `${index * 24}px`,
          }}
        />
      ))}
      {depth > 0 && (
        <div
          style={{
            position: "absolute",
            width: 12,
            borderTop: "1px solid #ddd",
            left: `${(depth - 1) * 24}px`,
            top: "16px",
          }}
        />
      )}
      {!!hasChildren && (
        <Image
          style={{
            transform: `rotate(${isExpanded ? 180 : 0}deg)`,
          }}
          src={ArrowDownIcon}
          width={12}
          height={12}
          alt="Show sub items indicator"
        />
      )}
      <Image src={typeIcon} width={20} height={20} alt="Tree item type" />
      <p>{item.name}</p>

      {!!statusIcon && (
        <Image src={statusIcon} width={12} height={12} alt="Asset status" />
      )}
      {item.sensorType === SensorType.energy && (
        <Image
          src={EnergySensorIcon}
          width={12}
          height={12}
          alt="Energy sensor indicator"
        />
      )}
    </li>
  );
}
