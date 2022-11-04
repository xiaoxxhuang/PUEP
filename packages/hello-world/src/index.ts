import { APIGatewayProxyResult, APIGatewayProxyHandler } from "aws-lambda";
import { getEmblemByName } from "./query";

export const lambdaHandler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const pkm = event.queryStringParameters?.pkm;
  const type = event.queryStringParameters?.type;
  try {
    if (pkm && type) {
      return {
        statusCode: 200,
        body: `Body: ${await getEmblemByName(
          pkm,
          type
        )}; pkm: ${pkm}; type: ${type} \n Event: ${event}`,
      };
    }
  } catch (error) {
    console.log(error);
  }
  return {
    statusCode: 400,
    body: "Emblem Not Found",
  };
};

// export function requestValidator(schema: Schema) {
//   return async (request: Request, response: Response, next: NextFunction) => {
//     try {
//       if (schema) {
//         await schema.validateAsync(request.params);
//       }
//       next();
//     } catch (e) {
//       next(e);
//     }
//   };
// }

// const getEmblemSchema = Joi.object({
//   version: Joi.string().required(),
//   pkm: Joi.string().required(),
//   type: Joi.string().required(),
// });

// const router = Router();

// router
//   .get(
//     "/puep/:version/emblems",
//     requestValidator(getEmblemSchema),
//     asyncHandler(emblemHandler)
//   )

// export default express().use(router);

// const defaultPortNumber = 9000;
// const port = Number(process.env.PORT || defaultPortNumber);

// express()
//   .use(router)
//   .listen(port, () => console.log(`Server running on port ${port}...`));
