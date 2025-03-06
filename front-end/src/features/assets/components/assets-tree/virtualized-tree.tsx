"use client";

import { flattenTree, Tree } from "../../utils/tree";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef, useState } from "react";
import TreeItemRow from "./tree-item";

export default function VirtualizedTree({
  tree,
  filter,
}: {
  tree: Tree;
  filter: string;
}) {
  const parentRef = useRef(null);

  const [expanded, setExpanded] = useState<Set<string>>(new Set([]));
  const [flattenedTree, setFlattenedTree] = useState(() => flattenTree(tree));

  useEffect(() => {
    if (filter) {
      const allExpanded: Set<string> = new Set([]);
      flattenTree(tree).forEach(({ item }) => allExpanded.add(item.id));
      setExpanded(allExpanded);
    }
  }, [filter, tree]);

  useEffect(() => {
    setFlattenedTree(flattenTree(tree, expanded));
  }, [tree, expanded]);

  const rowVirtualizer = useVirtualizer({
    count: flattenedTree.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 24,
    overscan: 10,
  });

  const toggleItem = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  return (
    <div className="tree">
      <ul
        ref={parentRef}
        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
      >
        {rowVirtualizer.getVirtualItems().map(({ index }) => {
          const { item, type, hasChildren, depth } = flattenedTree[index];

          return (
            <TreeItemRow
              expanded={expanded}
              key={item.id}
              onClick={toggleItem}
              item={item}
              type={type}
              hasChildren={hasChildren}
              depth={depth}
            />
          );
        })}
      </ul>
    </div>
  );
}
