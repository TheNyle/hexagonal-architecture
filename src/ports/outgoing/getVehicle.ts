// Port - Outgoing
// This file sits between the domain logic and the DynamoDB implementation
// If you need to swap out DynamoDB for another tech, it won't touch the domain

import DynamoDbVehicle from "../../adapters/dynamoDb/vehicle";

export const getVehicleFromPersistence = async (vin: string) => {
  const dynamoDb = new DynamoDbVehicle();
  
  return await dynamoDb.get(vin)
}