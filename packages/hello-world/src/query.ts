import { DynamoDB } from "aws-sdk";
import { IConfigEnvVars } from "./types";

const config: IConfigEnvVars = {
  dynamoDb: {
    tableName: "puep-dev-ddb",
  },
  environment: "dev",
};

function getDocumentClient() {
  return new DynamoDB.DocumentClient({
    apiVersion: "2012-08-10",
    region: "ap-southeast-1",
  });
}

export async function getEmblemByName(pkm: string, type: string) {
  const params: DynamoDB.DocumentClient.GetItemInput = {
    TableName: config.dynamoDb.tableName,
    Key: {
      pk: pkm,
      sk: type,
    },
  };
  const result = await getDocumentClient().get(params).promise();
  console.log(result);
  if (result?.Item) return result.Item;
}

async function parseArg(pkm: string, type: string) {
  console.log("start");
  try {
    if (pkm && type) {
      const emblem = await getEmblemByName(pkm, type);
      console.log(emblem);
      return {
        statusCode: 200,
        body: `Body: ${emblem}`,
      };
    }
  } catch (error) {
    console.log(error);
  }
  console.log("end");
}

console.log(parseArg("venasour", "bronze"));
