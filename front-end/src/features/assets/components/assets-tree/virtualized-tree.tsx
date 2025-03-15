"use client";

import {
  flattenTree,
  toggleTreeItem,
  Tree,
  TreeItemType,
} from "../../utils/tree";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import TreeItemRow from "./tree-item";
import { useFilters } from "../../hooks/use-filters";
import { useRouter } from "next/navigation";
import { useCompanyId } from "@/hooks/use-company-id";
import { serialize } from "@/searchParams";

const itemHeight = 35;

export default function VirtualizedTree(props: { tree: Tree }) {
  const [filters] = useFilters();
  const { push } = useRouter();
  const parentRef = useRef<HTMLDivElement>(null);
  const companyId = useCompanyId();
  const [scrollTop, setScrollTop] = useState(0);

  const [tree, setTree] = useState<Tree>([]);

  useEffect(() => {
    setTree(props.tree);
  }, [props.tree]);

  const flattenedTree = useMemo(() => flattenTree(tree), [tree]);

  const containerHeight = parentRef.current?.clientHeight || 400;

  const startIndex = useMemo(
    () => Math.floor(scrollTop / itemHeight),
    [scrollTop]
  );

  const endIndex = useMemo(
    () =>
      Math.min(
        startIndex + Math.ceil(containerHeight / itemHeight),
        flattenedTree.length
      ),
    [containerHeight, flattenedTree, startIndex]
  );

  const visibleItems = useMemo(() => {
    return flattenedTree.slice(startIndex, endIndex);
  }, [flattenedTree, startIndex, endIndex]);

  const toggleItem = useCallback(
    (id: string, type: TreeItemType) => {
      const newTree = toggleTreeItem(id, tree);
      setTree([...newTree]);

      if (type === "component") {
        const url = serialize(`/companies/${companyId}/assets`, {
          ...filters,
          asset: id,
        });
        push(url);
      }
    },
    [tree, companyId, push, filters]
  );

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
                  paddingLeft: 12,
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
