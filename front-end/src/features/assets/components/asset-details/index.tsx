// import { statusIcons } from "../assets-tree/asset-icons";
import Image from "next/image";

export default function AssetDetails() {
  const statusIcon = null;

  return (
    <section className="company-assets-sub-section">
      <header
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        <h1>{}</h1>
        {statusIcon && (
          <Image
            src={statusIcon}
            width={12}
            height={12}
            objectFit="contain"
            alt="Asset status"
          />
        )}
      </header>
    </section>
  );
}
