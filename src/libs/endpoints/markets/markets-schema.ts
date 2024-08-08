import { z } from "zod";

export const CurrencySchema = z.object({
  id: z.number(),
  title: z.string(),
  title_fa: z.string(),
  code: z.string(),
  tradable: z.boolean(),
  for_test: z.boolean(),
  image: z.string(),
  decimal: z.number(),
  decimal_amount: z.number(),
  decimal_irt: z.number(),
  color: z.string(),
  high_risk: z.boolean(),
  show_high_risk: z.boolean(),
  withdraw_commission: z.string(),
  tags: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      name_en: z.string(),
      has_chart: z.boolean(),
    })
  ),
  etf: z.boolean(),
  for_binvest: z.boolean(),
  for_loan: z.boolean(),
  for_stake: z.boolean(),
  recommend_for_deposit_weight: z.number(),
});

export type ICurrency = z.infer<typeof CurrencySchema>;

const OrderBookInfoSchema = z.object({
  created_at: z.nullable(z.number()),
  price: z.string(),
  change: z.number(),
  min: z.string(),
  max: z.string(),
  time: z.string(),
  mean: z.string(),
  value: z.string(),
  amount: z.string(),
});

const InternalPriceInfoSchema = z.object({
  created_at: z.number().nullable(),
  price: z.string().nullable(),
  change: z.number().nullable(),
  min: z.string().nullable(),
  max: z.string().nullable(),
  time: z.nullable(z.number()),
  mean: z.nullable(z.string()),
  value: z.nullable(z.string()),
  amount: z.nullable(z.string()),
}).partial();

const PriceInfoSchema = z.object({
  created_at: z.number().nullable(),
  price: z.string().nullable(),
  change: z.number().nullable(),
  min: z.string().nullable(),
  max: z.string().nullable(),
  time: z.nullable(z.number()),
  mean: z.nullable(z.string()),
  value: z.nullable(z.string()),
  amount: z.nullable(z.string()),
}).partial();

export const MarketSchema = z.object({
  id: z.number(),
  currency1: CurrencySchema,
  currency2: CurrencySchema,
  tradable: z.boolean(),
  otc_tradable: z.boolean(),
  coming_soon: z.boolean(),
  for_test: z.boolean(),
  otc_sell_percent: z.string(),
  otc_buy_percent: z.string(),
  otc_max_buy_amount: z.string(),
  otc_max_sell_amount: z.string(),
  order_book_info: OrderBookInfoSchema,
  internal_price_info: InternalPriceInfoSchema,
  price_info: PriceInfoSchema,
  price: z.string(),
  title: z.string(),
  code: z.string(),
  title_fa: z.string(),
  trading_view_source: z.string(),
  trading_view_symbol: z.string(),
  otc_market: z.boolean(),
  text: z.string(),
  volume_24h: z.string(),
  market_cap: z.string(),
  circulating_supply: z.string(),
  all_time_high: z.string(),
  popularity_weight: z.number(),
  freshness_weight: z.number(),
  price_increment: z.nullable(z.any()),
});

export type IMarket = z.infer<typeof MarketSchema>;