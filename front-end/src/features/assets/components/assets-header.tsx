import Button from "@/components/ui/button";
import Image from "next/image";
import EnergyIcon from "@/assets/icons/energy.svg";
import AlertRounded from "@/assets/icons/alert-rounded.svg";
import { getCompanies } from "@/services/tractian-fake-api";

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
      <div style={{ display: "flex", gap: 8 }}>
        <Button
          style={{ color: "#77818C" }}
          startIcon={<Image alt={"energy icon"} src={EnergyIcon} />}
        >
          Sensor de Energia
        </Button>
        <Button
          style={{ backgroundColor: "var(--color-primary)", color: "white" }}
          startIcon={<Image alt={"energy icon"} src={AlertRounded} />}
        >
          Crítico
        </Button>
      </div>
    </header>
  );
}
