import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { tradeHooks } from "../../../libs/endpoints/trade/trade-endpoints";
import OrdersTable from "./orders-table";
import TradesTable from "./trades-table";

type OrderbookActiveTabType = "buy" | "sell" | "trade";

export default function OrderBook({ marketId }: { marketId: string }) {
  const [orderbookActiveTab, setOrderbookActiveTab] =
    useState<OrderbookActiveTabType>("buy");

  const { data: ordersData, isLoading: OrdersIsLoading } =
    tradeHooks.useQueryAllOrders(
      {
        params: {
          id: marketId,
        },
        queries: {
          type: orderbookActiveTab as "buy" | "sell",
        },
      },
      {
        enabled: orderbookActiveTab !== "trade",
        refetchInterval: 3000,
      }
    );

  const { data: tradesData, isLoading: tradesIsLoading } =
    tradeHooks.useQueryAllTrades(
      {
        params: {
          id: marketId,
        },
      },
      {
        enabled: orderbookActiveTab === "trade",
        refetchInterval: 3000,
      }
    );

  const orders = ordersData?.orders || [];
  const trades = tradesData || [];

  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold">OrderBook</p>
      <Tabs
        value={orderbookActiveTab}
        onValueChange={(value) =>
          setOrderbookActiveTab(value as OrderbookActiveTabType)
        }
      >
        <TabsList>
          <TabsTrigger
            value="buy"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary-400 rounded-none"
          >
            Buy
          </TabsTrigger>
          <TabsTrigger
            value="sell"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary-400 rounded-none"
          >
            Sell
          </TabsTrigger>
          <TabsTrigger
            value="trade"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary-400 rounded-none"
          >
            Trades
          </TabsTrigger>
        </TabsList>

        <TabsContent value="buy">
          <OrdersTable
            orders={orders.slice(0, 10)}
            isLoading={OrdersIsLoading}
            type="buy"
          />
        </TabsContent>
        <TabsContent value="sell">
          {" "}
          <OrdersTable
            orders={orders.slice(0, 10)}
            isLoading={OrdersIsLoading}
            type="sell"
          />
        </TabsContent>
        <TabsContent value="trade">
          <TradesTable
            trades={trades.slice(0, 10)}
            isLoading={tradesIsLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
