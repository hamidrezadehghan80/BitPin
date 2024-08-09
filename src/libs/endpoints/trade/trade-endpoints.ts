import { makeApi, Zodios } from "@zodios/core";
import { ZodiosHooks } from "@zodios/react";
import { z } from "zod";
import * as Schemas from "./trade-schema";
import { BASE_API_URL } from "../../../config";
import { apiInstance } from "../../api-instance";

const endpoints = makeApi([
  {
    method: "get",
    path: "/v2/mth/actives/:id/",
    alias: "queryAllOrders",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "type",
        type: "Query",
        schema: z.enum(["buy", "sell"]),
      },
    ],
    response: z.object({
      orders: z.array(Schemas.OrderSchema),
      volume: z.string(),
    }),
  },
  {
    method: "get",
    path: "/v1/mth/matches/:id/",
    alias: "queryAllTrades",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.array(Schemas.TradeSchema),
  },
]);

const client = new Zodios(BASE_API_URL, endpoints, {
  axiosInstance: apiInstance,
});

export const tradeHooks = new ZodiosHooks("trade", client);
