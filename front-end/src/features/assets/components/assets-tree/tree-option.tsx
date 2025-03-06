import Image from "next/image";

import EnergySensorIcon from "@/assets/icons/energy-sensor.svg";
import ArrowDownIcon from "@/assets/icons/arrow-down.svg";

import { Tree, TreeItem } from "../../hooks/use-tree";
import { SensorType } from "@/types/assets";
import { statusIcons, typeIcons } from "./asset-icons";

export type TreeOptionProps = {
  type: "location" | "component" | "asset";
  subItems: Tree;
  item: TreeItem;
};

export default function TreeOption({ type, subItems, item }: TreeOptionProps) {
  const typeIcon = typeIcons[type];

  const statusIcon = item.status ? statusIcons[item.status] : null;

  return (
    <details>
      <summary>
        {!!subItems.length && (
          <Image
            className="show-sub-items-indicator"
            src={ArrowDownIcon}
            width={12}
            height={12}
            objectFit="contain"
            alt="Show sub items indicator"
          />
        )}
        <Image
          src={typeIcon}
          width={20}
          height={20}
          objectFit="contain"
          alt="Tree item type"
        />
        <p>{item.name}</p>

        {!!statusIcon && (
          <Image
            src={statusIcon}
            width={12}
            height={12}
            objectFit="contain"
            alt="Asset status"
          />
        )}
        {item.sensorType === SensorType.energy && (
          <Image
            src={EnergySensorIcon}
            width={12}
            height={12}
            objectFit="contain"
            alt="Energy sensor indicator"
          />
        )}
      </summary>
      <ul>
        {subItems.map(({ item, children, type }) => (
          <li key={item.id}>
            <TreeOption item={item} type={type} subItems={children} />
          </li>
        ))}
      </ul>
    </details>
  );
}
