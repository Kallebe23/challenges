import { api } from "@/lib/ky/api";
import { CompanyAsset } from "@/types/assets";

export async function getAssets(companyId: string) {
  const response = await api.get(`companies/${companyId}/assets`);
  return response.json<CompanyAsset[]>();
}
