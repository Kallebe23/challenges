import TreeFilter from "./tree-filter";

import { Suspense } from "react";
import TreeStructure from "./tree-structure";

interface AssetsTreeProps {
  companyId: string;
}

export default async function AssetsTree({ companyId }: AssetsTreeProps) {
  return (
    <section className="company-assets-sub-section">
      <TreeFilter />
      <Suspense>
        <TreeStructure companyId={companyId} />
      </Suspense>
    </section>
  );
}
