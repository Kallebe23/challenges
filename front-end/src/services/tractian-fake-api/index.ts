// server side fetches
import { Company } from "@/types/assets";

export async function getCompanies() {
  const response = await fetch("https://fake-api.tractian.com/companies");

  return response.json() as Promise<Company[]>;
}

// export async function getCompanyLocations(companyId: string) {
//   const response = await fetch(
//     `https://fake-api.tractian.com/companies/${companyId}/locations`
//   );

//   return response.json() as Promise<CompanyLocation[]>;
// }

// export async function getCompanyAssets(companyId: string) {
//   const response = await fetch(
//     `https://fake-api.tractian.com/companies/${companyId}/assets`
//   );

//   return response.json() as Promise<CompanyAsset[]>;
// }
