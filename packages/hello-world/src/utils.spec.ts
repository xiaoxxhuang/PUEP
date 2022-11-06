import { Utils } from "./utils";
import { DynamoDB } from "aws-sdk";

jest.mock("aws-sdk");

describe("Data Utilities", () => {
  it("should return dynamodb document client", () => {
    const result = Utils.getDocumentClient();

    expect(result).toBeInstanceOf(DynamoDB.DocumentClient);
    expect(DynamoDB.DocumentClient).toHaveBeenCalledWith({
      apiVersion: "2012-08-10",
      region: "ap-southeast-1",
    });
  });

  it("should return dynamodb table name", ()=>{
    const result = Utils.getTableName();

    expect(result).toStrictEqual("puep-dev-ddb")
  })
});
