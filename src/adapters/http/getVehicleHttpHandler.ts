// Adapter - Incoming
// This file is taking the data from its HTTP form and is making it usable for the app
// All HTTP-related methods are in here. Nowhere else.

import { getVehicleRequest } from "../../ports/incoming/getVehicle";

export const getVehicleHttpHandler = async (deps, event) => {
  const vin = event.pathParameters.vin;

  if (!vin) {
    return {
      statusCode: 400,
      body: "No VIN provided"
    };
  }

  const vehicle = await getVehicleRequest(vin);

  return {
    statusCode: 200,
    body: vehicle
  };
};