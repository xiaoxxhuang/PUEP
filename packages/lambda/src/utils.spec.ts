import { Utils } from "./utils";
import { DynamoDB } from "aws-sdk";

jest.mock("aws-sdk");

describe("Data Utilities", () => {
  beforeEach(() => {
    process.env.DYNAMODB_TABLE_NAME = "puep-dev-ddb";
    process.env.NODE_ENV = "dev";
    process.env.REGION = "ap-southeast-1";
    jest.resetModules();
  });

  it("should return dynamodb document client", () => {
    const result = Utils.getDocumentClient();

    expect(result).toBeInstanceOf(DynamoDB.DocumentClient);
    expect(DynamoDB.DocumentClient).toHaveBeenCalledWith({
      apiVersion: "2012-08-10",
      region: "ap-southeast-1",
    });
  });

  it("should return respective dynamodb table name", () => {
    const result = Utils.getTableName();

    expect(result).toStrictEqual("puep-dev-ddb");
  });

  it("should return respective node environment", () => {
    const result = Utils.getNodeEnvironment();

    expect(result).toStrictEqual("dev");
  });

  it("should return prod node environment when not declared", () => {
    delete process.env.NODE_ENV;
    const result = Utils.getNodeEnvironment();

    expect(result).toStrictEqual("prod");
  });
});
