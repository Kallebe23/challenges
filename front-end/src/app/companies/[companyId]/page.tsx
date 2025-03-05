import "@/assets/css/assets.css";
import CompanyAssetsHeader from "@/features/assets/components/assets-header";
import AssetsTree from "@/features/assets/components/assets-tree";

export default async function CompanyAssetsPage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;

  return (
    <section className="generic-section">
      <CompanyAssetsHeader companyId={companyId} />
      <AssetsTree />
    </section>
  );
}
