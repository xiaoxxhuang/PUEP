export type NODE_ENV = "local" | "production" | "staging" | "development";

export interface IConfigEnvVars {
  dynamoDb: {
    tableName: string;
  };
  environment: "prod" | "stage" | "dev" | "local";
}