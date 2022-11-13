export type NODE_ENV = "local" | "production" | "staging" | "development";

export interface IConfigEnvVars {
  dynamoDb: {
    tableName: string;
  };
  environment: "prod" | "stage" | "dev" | "local";
}

export interface IDBEmblem {
  pk: string;
  sk: string;
  color: string[];
  attack?: number;
  cooldown?:number;
  critical_rate?: number;
  defense?:number;
  hp?:number;
  movement_speed?:number;
  special_attack?:number;
  special_defense?:number;
}