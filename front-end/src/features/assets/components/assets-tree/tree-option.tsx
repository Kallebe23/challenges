import Image from "next/image";
import ArrowDownIcon from "@/assets/icons/arrow-down.svg";
import ComponentIcon from "@/assets/icons/component.png";
import LocationIcon from "@/assets/icons/location.svg";
import AssetIcon from "@/assets/icons/asset.svg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Tree } from "../../hooks/use-tree";
import { useState } from "react";

interface TreeOptionProps {
  type: "location" | "component" | "asset";
  name: string;
  subItems: Tree;
}

const typeIcons: Record<TreeOptionProps["type"], StaticImport> = {
  location: LocationIcon,
  asset: AssetIcon,
  component: ComponentIcon,
};

export default function TreeOption({ type, name, subItems }: TreeOptionProps) {
  const typeIcon = typeIcons[type];
  const [showSubItems, setShowSubItems] = useState(false);

  const toggleShowSubItems = () => {
    setShowSubItems(!showSubItems);
  };

  return (
    <>
      <div onClick={toggleShowSubItems} className="tree-option-container">
        {!!subItems.length && (
          <Image
            src={ArrowDownIcon}
            style={{ transform: `rotate(${showSubItems ? "0" : "180"}deg)` }}
            alt="Tree item toggle indicator"
          />
        )}

        <Image
          src={typeIcon}
          width={20}
          height={20}
          objectFit="contain"
          alt="Tree item type"
        />
        <p>{name}</p>
      </div>
      {showSubItems && (
        <div
          style={{
            display: "block",
            marginLeft: 12,
            borderLeft: "1px solid #ddd",
          }}
        >
          {subItems.map(({ item, children, type }) => (
            <TreeOption
              key={item.id}
              name={item.name}
              type={type}
              subItems={children}
            />
          ))}
        </div>
      )}
    </>
  );
}
