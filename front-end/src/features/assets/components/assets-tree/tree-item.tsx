"use client";
import Image from "next/image";

import EnergySensorIcon from "@/assets/icons/energy-sensor.svg";
import ArrowDownIcon from "@/assets/icons/arrow-down.svg";

import { SensorType } from "@/types/assets";
import { statusIcons, typeIcons } from "./asset-icons";
import { TreeItem } from "../../utils/tree";
import { useMemo } from "react";

export type TreeOptionProps = {
  type: "location" | "component" | "asset";
  item: TreeItem;
  hasChildren: boolean;
  depth: number;
  onClick: (id: string) => void;
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
  const typeIcon = useMemo(() => typeIcons[type], [type]);

  const statusIcon = useMemo(
    () => (item.status ? statusIcons[item.status] : null),
    [item.status]
  );

  const isExpanded = useMemo(() => expanded.has(item.id), [expanded, item.id]);
  const leftPadding = depth * 24;

  return (
    <li
      onClick={() => {
        onClick(item.id);
      }}
      className="tree-list-item"
      style={{
        marginLeft: depth !== 0 ? 4 : 0,
        paddingLeft: leftPadding,
        position: "relative",
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
          unoptimized
          src={ArrowDownIcon}
          width={12}
          height={12}
          alt="Show sub items indicator"
        />
      )}
      <Image
        unoptimized
        src={typeIcon}
        width={20}
        height={20}
        alt="Tree item type"
      />
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
