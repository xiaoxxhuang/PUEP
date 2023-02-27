import {
  getEmblemById,
  getEmblemsByPrimaryFocus,
  getEmblemsByFocuses,
} from "./query";
import { Utils } from "../utils";
import { IDBEmblem } from "./types";

jest.mock("aws-sdk");
jest.mock("../utils");

describe("Dynamodb query", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (Utils.getTableName as jest.Mock).mockResolvedValue("puep_table");
  });
  describe("getEmblemById()", () => {
    const dummyPokemon = "venusaur";
    const dummyEmblem: IDBEmblem = {
      pk: `emblem:${dummyPokemon}`,
      color: "green",
      attack: -1.2,
      special_attack: 1.8,
      url: "https//example.com",
    };

    it("shoud successfully get emblem by id", async () => {
      const mockDocumentClient = {
        get: jest.fn().mockReturnThis(),
        promise: jest.fn().mockResolvedValue({ Item: dummyEmblem }),
      };
      (Utils.getDocumentClient as jest.Mock).mockReturnValue(
        mockDocumentClient
      );

      const result = await getEmblemById(dummyPokemon);

      expect(result).toStrictEqual(dummyEmblem);
      expect(mockDocumentClient.get).toHaveBeenCalledWith({
        TableName: Utils.getTableName(),
        Key: {
          pk: `emblem:${dummyPokemon}`,
        },
      });
    });

    it("shoud return undefined when emblem does not exist", async () => {
      const mockDocumentClient = {
        get: jest.fn().mockReturnThis(),
        promise: jest.fn().mockResolvedValue({}),
      };
      (Utils.getDocumentClient as jest.Mock).mockReturnValue(
        mockDocumentClient
      );

      const result = await getEmblemById(dummyPokemon);

      expect(result).toBeUndefined();
      expect(mockDocumentClient.get).toHaveBeenCalledWith({
        TableName: Utils.getTableName(),
        Key: {
          pk: `emblem:${dummyPokemon}`,
        },
      });
    });

    it("shoud return undefined when result is undefined", async () => {
      const mockDocumentClient = {
        get: jest.fn().mockReturnThis(),
        promise: jest.fn().mockResolvedValue(undefined),
      };
      (Utils.getDocumentClient as jest.Mock).mockReturnValue(
        mockDocumentClient
      );

      const result = await getEmblemById(dummyPokemon);

      expect(result).toBeUndefined();
      expect(mockDocumentClient.get).toHaveBeenCalledWith({
        TableName: Utils.getTableName(),
        Key: {
          pk: `emblem:${dummyPokemon}`,
        },
      });
    });
  });

  describe("getEmblemsByPrimaryFocus()", () => {
    const dummyPrimaryFocus = "hp";
    const dummyEmblems: IDBEmblem[] = [
      {
        pk: `emblem:`,
        color: "green",
        hp: 30,
        attack: -1.2,
        url: "https//example.com",
      },
    ];

    it("shoud successfully get emblems by primary focus", async () => {
      const mockDocumentClient = {
        scan: jest.fn().mockReturnThis(),
        promise: jest.fn().mockResolvedValue({ Items: dummyEmblems }),
      };
      (Utils.getDocumentClient as jest.Mock).mockReturnValue(
        mockDocumentClient
      );

      const result = await getEmblemsByPrimaryFocus(dummyPrimaryFocus);

      expect(result).toStrictEqual(dummyEmblems);
      expect(mockDocumentClient.scan).toHaveBeenCalledWith({
        TableName: Utils.getTableName(),
        FilterExpression:
          "begins_with(#pk, :prefix) AND #focus >= :focus AND #type = :type",
        ExpressionAttributeNames: {
          "#pk": "pk",
          "#focus": `${dummyPrimaryFocus}`,
          "#type": "type",
        },
        ExpressionAttributeValues: {
          ":prefix": "emblem:",
          ":focus": 0,
          ":type": "gold",
        },
      });
    });

    it("shoud return undefined when emblem does not exist", async () => {
      const mockDocumentClient = {
        scan: jest.fn().mockReturnThis(),
        promise: jest.fn().mockResolvedValue({}),
      };
      (Utils.getDocumentClient as jest.Mock).mockReturnValue(
        mockDocumentClient
      );

      const result = await getEmblemsByPrimaryFocus(dummyPrimaryFocus);

      expect(result).toBeUndefined();
      expect(mockDocumentClient.scan).toHaveBeenCalledWith({
        TableName: Utils.getTableName(),
        FilterExpression:
          "begins_with(#pk, :prefix) AND #focus >= :focus AND #type = :type",
        ExpressionAttributeNames: {
          "#pk": "pk",
          "#focus": `${dummyPrimaryFocus}`,
          "#type": "type",
        },
        ExpressionAttributeValues: {
          ":prefix": "emblem:",
          ":focus": 0,
          ":type": "gold",
        },
      });
    });

    it("shoud return undefined when result is undefined", async () => {
      const mockDocumentClient = {
        scan: jest.fn().mockReturnThis(),
        promise: jest.fn().mockResolvedValue(undefined),
      };
      (Utils.getDocumentClient as jest.Mock).mockReturnValue(
        mockDocumentClient
      );

      const result = await getEmblemsByPrimaryFocus(dummyPrimaryFocus);

      expect(result).toBeUndefined();
      expect(mockDocumentClient.scan).toHaveBeenCalledWith({
        TableName: Utils.getTableName(),
        FilterExpression:
          "begins_with(#pk, :prefix) AND #focus >= :focus AND #type = :type",
        ExpressionAttributeNames: {
          "#pk": "pk",
          "#focus": `${dummyPrimaryFocus}`,
          "#type": "type",
        },
        ExpressionAttributeValues: {
          ":prefix": "emblem:",
          ":focus": 0,
          ":type": "gold",
        },
      });
    });
  });

  describe("getEmblemsByFocuses()", () => {
    const dummyPrimaryFocus = "hp";
    const dummySecondaryFocus = "attack";
    const dummyEmblems: IDBEmblem[] = [
      {
        pk: `emblem:`,
        color: "green",
        hp: 30,
        defense: -3,
        url: "https//example.com",
      },
    ];

    it("shoud successfully get emblems by focuses", async () => {
      const mockDocumentClient = {
        scan: jest.fn().mockReturnThis(),
        promise: jest.fn().mockResolvedValue({ Items: dummyEmblems }),
      };
      (Utils.getDocumentClient as jest.Mock).mockReturnValue(
        mockDocumentClient
      );

      const result = await getEmblemsByFocuses(
        dummyPrimaryFocus,
        dummySecondaryFocus
      );

      expect(result).toStrictEqual(dummyEmblems);
    });

    it("shoud return undefined when emblem does not exist", async () => {
      const mockDocumentClient = {
        scan: jest.fn().mockReturnThis(),
        promise: jest.fn().mockResolvedValue({}),
      };
      (Utils.getDocumentClient as jest.Mock).mockReturnValue(
        mockDocumentClient
      );

      const result = await getEmblemsByFocuses(
        dummyPrimaryFocus,
        dummySecondaryFocus
      );

      expect(result).toBeUndefined();
    });

    it("shoud return undefined when result is undefined", async () => {
      const mockDocumentClient = {
        scan: jest.fn().mockReturnThis(),
        promise: jest.fn().mockResolvedValue(undefined),
      };
      (Utils.getDocumentClient as jest.Mock).mockReturnValue(
        mockDocumentClient
      );

      const result = await getEmblemsByFocuses(
        dummyPrimaryFocus,
        dummySecondaryFocus
      );

      expect(result).toBeUndefined();
    });
  });
});
