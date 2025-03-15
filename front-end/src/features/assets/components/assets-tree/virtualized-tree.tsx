"use client";

import {
  FlattenedTree,
  flattenTree,
  toggleTreeItem,
  Tree,
  TreeItemType,
} from "../../utils/tree";
import { useEffect, useRef, useState } from "react";
import TreeItemRow from "./tree-item";
import { useFilters } from "../../hooks/use-filters";
import { useRouter } from "next/navigation";
import { useCompanyId } from "@/hooks/use-company-id";
import { serialize } from "@/searchParams";

const itemHeight = 35;

export default function VirtualizedTree(props: { tree: Tree }) {
  const [filters] = useFilters();
  const { push } = useRouter();
  const companyId = useCompanyId();
  const [scrollTop, setScrollTop] = useState(0);

  const [tree, setTree] = useState<Tree>([]);

  useEffect(() => {
    setTree(props.tree);
  }, [props.tree]);

  const parentRef = useRef<HTMLDivElement>(null);

  const containerHeight = parentRef.current?.clientHeight || 400;

  const [flattenedTree, setFlattenedTree] = useState<FlattenedTree>(() => []);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight),
    flattenedTree.length
  );

  useEffect(() => {
    const flattened = flattenTree(tree);
    setFlattenedTree(flattened);
  }, [tree]);

  const toggleItem = (id: string, type: TreeItemType) => {
    const newTree = toggleTreeItem(id, tree);
    setTree([...newTree]);

    if (type === "component") {
      const url = serialize(`/companies/${companyId}/assets`, {
        ...filters,
        asset: id,
      });
      push(url);
    }
  };

  const visibleItems = flattenedTree.slice(startIndex, endIndex);

  return (
    <div
      style={{
        flex: 1,
        width: "100%",
        overflowY: "auto",
      }}
      ref={parentRef}
      onScroll={(event) => {
        setScrollTop(event.currentTarget.scrollTop);
      }}
    >
      <ul
        style={{
          height: `${flattenedTree.length * itemHeight}px`,
          position: "relative",
          width: "100%",
        }}
      >
        {visibleItems.map(
          ({ item, type, depth, hasChildren, expanded }, index) => {
            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${itemHeight}px`,
                  transform: `translateY(${
                    (startIndex + index) * itemHeight
                  }px)`,
                }}
              >
                <TreeItemRow
                  isExpanded={expanded}
                  hasChildren={hasChildren}
                  key={index}
                  onClick={toggleItem}
                  item={item}
                  type={type}
                  depth={depth}
                />
              </div>
            );
          }
        )}
      </ul>
    </div>
  );
}
