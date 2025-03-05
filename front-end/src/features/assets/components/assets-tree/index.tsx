"use client";
import Image from "next/image";
import SearchIcon from "@/assets/icons/search.svg";
// since we need to "listen" to user input and react to its change this should be a client component

import { useAssets } from "../../hooks/use-assets";
import { useLocations } from "../../hooks/use-locations";
import { useTree } from "../../hooks/use-tree";
import TreeOption from "./tree-option";

export default function AssetsTree() {
  const { data: assets } = useAssets();
  const { data: locations } = useLocations();

  const tree = useTree(locations, assets);

  return (
    <section className="company-assets-sub-section">
      <div id="assets-filter-container">
        <input
          id="assets-filter-input"
          spellCheck={false}
          placeholder="Buscar Ativo ou Local"
        />
        <div style={{ paddingRight: 12, paddingLeft: 12 }}>
          <Image src={SearchIcon} alt="search icon" height={14} width={14} />
        </div>
      </div>

      <div style={{ display: "block" }}>
        {tree.map(({ item, type, children }) => (
          <TreeOption
            key={item.id}
            name={item.name}
            type={type}
            subItems={children}
          />
        ))}
      </div>
    </section>
  );
}
