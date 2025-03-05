import Logo from "@/assets/icons/logo.svg";
import Image from "next/image";
import CompanyLink from "./company-link";
import { getCompanies } from "@/services/tractian-fake-api";

export default async function Header() {
  const companies = await getCompanies();

  return (
    <header className="main-header">
      <Image src={Logo} alt="logo" height={14} objectFit="contain" />
      <nav
        style={{
          display: "flex",
          gap: "16px",
        }}
      >
        {companies.map((company) => (
          <CompanyLink
            key={company.id}
            company={company}
            href={`/companies/${company.id}`}
          />
        ))}
      </nav>
    </header>
  );
}
