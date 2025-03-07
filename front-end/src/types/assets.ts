export type Company = {
  id: string;
  name: string;
};

export type CompanyLocation = {
  id: string;
  name: string;
  parentId: string | null;
};

export type CompanyAsset = {
  id: string;
  name: string;
  parentId: string | null;

  sensorId?: string;
  gatewayId?: string;

  locationId: string | null;
  sensorType: SensorType | null;
  status: AssetStatus | null;
};

export enum SensorType {
  vibration = "vibration",
  energy = "energy",
}

export enum AssetStatus {
  operating = "operating",
  alert = "alert",
}
