// Repository
// An interface that is implemented by persistence layer adapters

import { Vehicle } from "../domain/entities/vehicle"

export interface VehicleRepository {
  get: (vin: string) => Promise<Vehicle>
}