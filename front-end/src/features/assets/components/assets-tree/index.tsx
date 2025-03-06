import { Suspense } from "react";
import TreeFilter from "./tree-filter";
import TreeServerWrapper from "./tree-server-wrapper";
import TreeSkeleton from "./tree-skeleton";

export default async function AssetsTree({ companyId }: { companyId: string }) {
  return (
    <section className="company-assets-sub-section">
      <TreeFilter />
      <Suspense fallback={<TreeSkeleton />}>
        <TreeServerWrapper companyId={companyId} />
      </Suspense>
    </section>
  );
}
