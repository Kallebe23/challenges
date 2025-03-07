import { getCompanies } from "@/services/tractian-fake-api";
import AssetsFilters from "./assets-filters";

export default async function CompanyAssetsHeader({
  companyId,
}: {
  companyId: string;
}) {
  // automatically memoized by nextjs if requested on another server component
  // https://nextjs.org/docs/app/building-your-application/caching#request-memoization
  const companies = await getCompanies();
  const selectedCompany = companies.find((company) => company.id === companyId);

  return (
    <header className="company-assets-header">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <h3>Ativos</h3>
        <h4 style={{ fontWeight: 400, color: "#77818C" }}>
          / {selectedCompany?.name || ""} Unit
        </h4>
      </div>
      <AssetsFilters companyId={companyId} />
    </header>
  );
}
