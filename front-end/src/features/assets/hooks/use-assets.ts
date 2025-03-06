// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "next/navigation";
// import { getAssets } from "../api/assets";

// export function useAssets() {
//   const { companyId } = useParams<{ companyId: string }>();

//   return useQuery({
//     queryKey: ["ASSETS", companyId],
//     queryFn: () => getAssets(companyId),
//     initialData: [],
//   });
// }
