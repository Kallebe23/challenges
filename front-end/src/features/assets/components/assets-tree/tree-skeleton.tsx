const items = new Array(10).fill(null);

export default function TreeSkeleton() {
  return (
    <ul
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        padding: 12,
      }}
    >
      {items.map((_, index) => (
        <li key={index} className="tree-skeleton-item" />
      ))}
    </ul>
  );
}
