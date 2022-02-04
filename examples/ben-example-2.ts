interface GetInspectionAdapter<T> {
  getVin: (event: T) => string;
  getInspectionId: (event: T) => string;
}

const definedOrThrow = <T>(a: T | undefined, message: string) => {
  if (!a) throw new Error(message);
  return a;
};

const LambdaGetInspectionAdapter: GetInspectionAdapter<APIGatewayProxyEvent> = {
  getVin: (e) =>
    definedOrThrow<string>(
      e.pathParameters?.["vin"],
      "vin missing from path params"
    ),
  getInspectionId: (e) =>
    definedOrThrow<string>(
      e.pathParameters?.["inspectionId"],
      "inspectionId missing from path params"
    ),
};


const buildGetInspectionHandler = <E>(getData: GetInspectionAdapter<E>) => {
  const handler = async (event: E) => {
    let vin: string;
    let inspectionId: string;

    try {
      vin = getData.getVin(event);
      inspectionId = getData.getInspectionId(event);
    } catch (error) {
      return {
        statusCode: 400,
        body: error.message,
      };
    }

    const query = buildGetInspectionQuery();
    let inspection: Inspection;
    try {
      inspection = await query.execute(vin, inspectionId);
    } catch (error) {
      return {
        statusCode: 400,
        body: error.message,
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(inspection),
    };
  };

  return handler;
};


const handler = buildGetInspectionHandler<APIGatewayProxyEvent>(LambdaGetInspectionAdapter)