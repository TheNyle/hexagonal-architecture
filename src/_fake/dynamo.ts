import { Vehicle } from "../repositories/vehicle";

export const dynamo = {
  query: (vin: string): Promise<Vehicle> => new Promise((resolve) => {
    resolve({
      vin: "",
      vrm: "",
      make: "",
      model: "",
      colour: "",
    });
  })
};