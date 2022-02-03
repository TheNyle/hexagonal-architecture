// Port - Incoming
// This file sits between the HTTP adapter and the domain logic

import { getVehicleByVin } from "../../domain/getVehicleByVin";

export const getVehicleRequest = async (vin: string) => {
  try {
    return await getVehicleByVin(vin);
  } catch(err) {
    throw new Error(err);
  }
};