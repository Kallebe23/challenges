import { useParams } from "next/navigation";

export function useCompanyId() {
  const { companyId } = useParams<{ companyId: string }>();
  return companyId;
}
