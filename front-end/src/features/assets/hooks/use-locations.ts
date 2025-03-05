import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getLocations } from "../api/locations";

export function useLocations() {
  const { companyId } = useParams<{ companyId: string }>();

  return useQuery({
    queryKey: ["LOCATIONS", companyId],
    queryFn: () => getLocations(companyId),
    initialData: [],
  });
}
