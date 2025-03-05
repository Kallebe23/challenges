import { api } from "@/lib/ky/api";
import { CompanyLocation } from "@/types/assets";

export async function getLocations(companyId: string) {
  const response = await api.get(`companies/${companyId}/locations`);
  return response.json<CompanyLocation[]>();
}
