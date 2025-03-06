"use client";
import Image from "next/image";
import { useQueryState } from "nuqs";
import { ChangeEvent, useEffect } from "react";
import SearchIcon from "@/assets/icons/search.svg";
import { useDebounce } from "@/hooks/use-debounce";
import { useParams, useRouter } from "next/navigation";
import { serialize } from "@/searchParams";

// since we need to "listen" to user input and react to its change this should be a client component
export default function TreeFilter() {
  const [filter, setFilter] = useQueryState("filter");
  const debouncedFilter = useDebounce(filter || "", 500);
  const { push } = useRouter();
  const { companyId } = useParams<{ companyId: string }>();

  useEffect(() => {
    push(
      serialize(`/companies/${companyId}/assets`, {
        filter: debouncedFilter,
      })
    );
  }, [debouncedFilter, companyId, push]);

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <header id="assets-filter-container">
      <input
        value={filter || ""}
        onChange={handleFilterChange}
        id="assets-filter-input"
        spellCheck={false}
        placeholder="Buscar Ativo ou Local"
      />
      <div style={{ paddingRight: 12, paddingLeft: 12 }}>
        <Image src={SearchIcon} alt="search icon" height={14} width={14} />
      </div>
    </header>
  );
}
