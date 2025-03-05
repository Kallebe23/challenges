export type Company = {
  id: string;
  name: string;
};

export type CompanyLocation = {
  id: string;
  name: string;
  parentId: string | null;
};

export enum SensorType {
  vibration = "vibration",
  energy = "energy",
}

export enum AssetStatus {
  operating = "operating",
  alert = "alert",
}

export type CompanyAsset = {
  id: string;
  locationId: string | null;
  name: string;
  parentId: string | null;
  sensorType: SensorType | null;
  status: AssetStatus | null;
};
