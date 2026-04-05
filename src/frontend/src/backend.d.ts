import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;

export interface EMGRecord {
  emg: bigint;
  activity: string;
  calories: bigint;
  protein: bigint;
  carbs: bigint;
  water: number;
  recommendation: string;
}

export interface backendInterface {
  getEMGRecommendation(emgValue: bigint): Promise<EMGRecord>;
  getEMGDataset(): Promise<EMGRecord[]>;
}
