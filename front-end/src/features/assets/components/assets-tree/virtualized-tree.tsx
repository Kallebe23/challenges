"use client";

import { flattenTree, toggleTreeItem, Tree } from "../../utils/tree";
import { useEffect, useMemo, useRef, useState } from "react";
import TreeItemRow from "./tree-item";

const itemHeight = 35;

export default function VirtualizedTree(props: { tree: Tree }) {
  const parentRef = useRef<HTMLDivElement>(null);
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

  const toggleItem = (id: string) => {
    const newTree = toggleTreeItem(id, tree);
    setTree([...newTree]);
  };

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
