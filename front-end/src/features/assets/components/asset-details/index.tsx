// import { statusIcons } from "../assets-tree/asset-icons";
import { searchParamsCache } from "@/searchParams";
import { getCompanyAssets } from "@/services/tractian-fake-api";
import Image from "next/image";
import { statusIcons } from "../assets-tree/asset-icons";
import { SensorType } from "@/types/assets";

export default async function AssetDetails({
  companyId,
}: {
  companyId: string;
}) {
  const assetId = searchParamsCache.get("asset");
  const assets = await getCompanyAssets(companyId);
  const selectedAsset = assets.find((asset) => asset.id === assetId);

  if (!selectedAsset) return null;

  const statusIcon = selectedAsset.status
    ? statusIcons[selectedAsset.status]
    : null;

  const sensorType =
    selectedAsset.sensorType === SensorType.energy ? "Elétrico" : "Vibração";

  return (
    <section className="company-assets-sub-section">
      <header
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          borderBottom: "2px solid #ddd",
          padding: 12,
        }}
      >
        <h3>{selectedAsset.name}</h3>
        {statusIcon && (
          <Image src={statusIcon} width={12} height={12} alt="Asset status" />
        )}
      </header>
      <div style={{ padding: 12 }}>
        <h4>Tipo de Sensor</h4>
        <p>{sensorType}</p>
        {selectedAsset.sensorId && (
          <>
            <hr />
            <h4>Sensor</h4>
            <p>{selectedAsset.sensorId}</p>
          </>
        )}
        {selectedAsset.gatewayId && (
          <>
            <hr />
            <h4>Receptor</h4>
            <p>{selectedAsset.gatewayId}</p>
          </>
        )}
      </div>
    </section>
  );
}
