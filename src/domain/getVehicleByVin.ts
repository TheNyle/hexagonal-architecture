// Domain logic
// Logic that should never change for technical / implementation reasons
// This should be business rules only

import { getVehicleFromPersistence } from "../ports/outgoing/getVehicle";

export const getVehicleByVin = async (vin: string) => {
  // Business logic
  // ...
  return await getVehicleFromPersistence(vin)
};