// Adapter - Outgoing
// DynamoDB implementation of the vehicle repository
// This is the only file that knows anything about DynamoDB

import { dynamo } from "../../_fake/dynamo";
import { VehicleRepository } from "../../repositories/vehicle";

class DynamoDbVehicle implements VehicleRepository {
  constructor() {}

  async get(vin: string) {
    const result = await dynamo.query(vin);

    return result;
  }
}

export default DynamoDbVehicle;