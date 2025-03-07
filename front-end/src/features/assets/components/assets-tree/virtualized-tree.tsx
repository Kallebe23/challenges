"use client";

import { flattenTree, Tree, TreeItemType } from "../../utils/tree";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef, useState } from "react";
import TreeItemRow from "./tree-item";
import { useFilters } from "../../hooks/use-filters";
import { useRouter } from "next/navigation";
import { useCompanyId } from "@/hooks/use-company-id";
import { serialize } from "@/searchParams";

export default function VirtualizedTree({ tree }: { tree: Tree }) {
  const [filters] = useFilters();
  const { push } = useRouter();
  const companyId = useCompanyId();

  const parentRef = useRef(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set([]));
  const [flattenedTree, setFlattenedTree] = useState(() => flattenTree(tree));

  useEffect(() => {
    const { filter, onlyEnergySensors, onlyCritical } = filters;
    if (filter || onlyCritical || onlyEnergySensors) {
      const allExpanded: Set<string> = new Set([]);
      flattenTree(tree).forEach(({ item }) => allExpanded.add(item.id));
      setExpanded(allExpanded);
    }
  }, [filters, tree]);

  useEffect(() => {
    setFlattenedTree(flattenTree(tree, expanded));
  }, [tree, expanded]);

  const rowVirtualizer = useVirtualizer({
    count: flattenedTree.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 24,
    overscan: 10,
  });

  const toggleItem = (id: string, type: TreeItemType) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });

    if (type === "component") {
      const url = serialize(`/companies/${companyId}/assets`, {
        ...filters,
        asset: id,
      });
      push(url);
    }
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
