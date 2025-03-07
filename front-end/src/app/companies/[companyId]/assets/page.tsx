import "@/assets/css/assets.css";
import AssetDetails from "@/features/assets/components/asset-details";
import CompanyAssetsHeader from "@/features/assets/components/assets-header";
import AssetsTree from "@/features/assets/components/assets-tree";
import { searchParamsCache } from "@/searchParams";
import { type SearchParams } from "nuqs/server";

type PageProps = {
  searchParams: Promise<SearchParams>;
  params: Promise<{ companyId: string }>;
};

export default async function CompanyAssetsPage({
  params,
  searchParams,
}: PageProps) {
  await searchParamsCache.parse(searchParams);
  const { companyId } = await params;

  return (
    <section className="generic-section">
      <CompanyAssetsHeader companyId={companyId} />
      <div className="assets-sections-container">
        <AssetsTree companyId={companyId} />
        <AssetDetails companyId={companyId} />
      </div>
    </section>
  );
}
