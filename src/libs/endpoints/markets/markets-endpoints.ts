import { makeApi, Zodios } from "@zodios/core";
import { ZodiosHooks } from "@zodios/react";
import { z } from "zod";
import * as Schemas from "./markets-schema";
import { BASE_API_URL } from "../../../config";
import { apiInstance } from "../../api-instance";

const endpoints = makeApi([
  {
    method: "get",
    path: "/v1/mkt/markets/",
    alias: "queryAllMarkets",
    requestFormat: "json",
    parameters: [],
    response: z.object({
      count: z.number(),
      next: z.nullable(z.any()),
      previous: z.nullable(z.any()),
      results: z.array(Schemas.MarketSchema),
    }),
  },
]);

const client = new Zodios(BASE_API_URL, endpoints, {
  axiosInstance: apiInstance,
});

export const marketsHooks = new ZodiosHooks("markets", client);
