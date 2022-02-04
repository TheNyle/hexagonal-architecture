// Lambda handler
const getInspection = async (event: APIGatewayProxyEvent) => {
  const vin = event.body.vin;
  const inspectionId = event.body.inspectionId;

  const query = buildGetInspectionQuery();
  let inspection;
  try {
    inspection = await query.execute(vin, inspectionId);
  } catch (e) {
    return {
      statusCode: 500,
      body: e.message,
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(inspection),
  };
};

// domain 
const getInspectionQuery = (vehicleRepo: VehicleRepo) => {
  const execute = async (
    vin: string,
    inspectionId: string
  ): Promise<Inspection> => {
    const vehicle = await vehicleRepo.getByVin(vin);

    if (!vehicle) {
      throw new Error("missing vehicle");
    }

    const inspection = vehicle
      .getInspections()
      .find((i) => i.id === inspectionId);
    if (!inspection) {
      throw new Error("missing inspection");
    }

    return inspection;
  };

  return { execute };
};

const buildGetInspectionQuery = () => {
  const withTrace = "" as any;
  // const mongoVehicleRepo = "" as unknown as VehicleRepo;
  const dynamoVehicleRepo = DynamoVehicleRepo.forConnection({}, withTrace);
  return getInspectionQuery(dynamoVehicleRepo );
};