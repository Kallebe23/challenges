import Button from "@/components/ui/button";
import Image from "next/image";

import EnergyIconActive from "@/assets/icons/energy-active.svg";
import EnergyIconInactive from "@/assets/icons/energy-inactive.svg";

import AlertRoundedInactive from "@/assets/icons/alert-rounded-inactive.svg";
import AlertRoundedActive from "@/assets/icons/alert-rounded-active.svg";
import { searchParamsCache, serialize } from "@/searchParams";
import Link from "next/link";

export default async function AssetsFilters({
  companyId,
}: {
  companyId: string;
}) {
  const { onlyCritical, onlyEnergySensors, ...rest } = searchParamsCache.all();

  const onlyEnergySensorsLink = serialize(`/companies/${companyId}/assets`, {
    onlyEnergySensors: !onlyEnergySensors,
    ...rest,
  });

  const onlyCriticalLink = serialize(`/companies/${companyId}/assets`, {
    onlyCritical: !onlyCritical,
    ...rest,
  });

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Link href={onlyEnergySensorsLink}>
        <Button
          style={{
            color: onlyEnergySensors ? "white" : "#77818C",
            backgroundColor: onlyEnergySensors
              ? "var(--color-primary)"
              : undefined,
          }}
          startIcon={
            <Image
              alt={"energy icon"}
              src={
                onlyEnergySensors ? AlertRoundedActive : AlertRoundedInactive
              }
            />
          }
        >
          Sensor de Energia
        </Button>
      </Link>
      <Link href={onlyCriticalLink}>
        <Button
          style={{
            color: onlyCritical ? "white" : "#77818C",
            backgroundColor: onlyCritical ? "var(--color-primary)" : undefined,
          }}
          startIcon={
            <Image
              alt={"energy icon"}
              src={onlyCritical ? EnergyIconActive : EnergyIconInactive}
            />
          }
        >
          Crítico
        </Button>
      </Link>
    </div>
  );
}
