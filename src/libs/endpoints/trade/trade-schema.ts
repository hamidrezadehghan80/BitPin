import { z } from "zod";

export const OrderSchema = z.object({
  amount: z.string(),
  remain: z.string(),
  price: z.string(),
  value: z.string(),
});

export type IOrder = z.infer<typeof OrderSchema>;

export const TradeSchema = z.object({
  time: z.number(),
  price: z.string(),
  value: z.string(),
  match_amount: z.string(),
  type: z.enum(["buy", "sell"]),
  match_id: z.string(),
});

export type ITrade = z.infer<typeof TradeSchema>;

export type OrderSideType = "buy" | "sell";
