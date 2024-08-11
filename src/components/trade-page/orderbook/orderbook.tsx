import { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { tradeHooks } from "../../../libs/endpoints/trade/trade-endpoints";
import OrdersTable from "./orders-table";
import TradesTable from "./trades-table";
import { OrderSideType } from "../../../libs/endpoints/trade/trade-schema";
import useWindowSize from "../../../libs/hooks/use-window-size";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../../../components/ui/carousel";
import { cn } from "../../../libs/utils";

type OrderbookActiveTabType = "buy" | "sell" | "trade";

const OrderbookActiveTabMap: Record<number, OrderbookActiveTabType> = {
  1: "buy",
  2: "sell",
  3: "trade",
};

export default function OrderBook({
  marketId,
  baseCurrency,
  quoteCurrency,
}: {
  marketId: string;
  baseCurrency: string;
  quoteCurrency: string;
}) {
  const [orderbookActiveTab, setOrderbookActiveTab] =
    useState<OrderbookActiveTabType>("buy");

  const { data: ordersData, isLoading: OrdersIsLoading } =
    tradeHooks.useQueryAllOrders(
      {
        params: {
          id: marketId,
        },
        queries: {
          type: orderbookActiveTab as OrderSideType,
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

  const { isDesktop } = useWindowSize();

  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    setOrderbookActiveTab(
      OrderbookActiveTabMap[carouselApi.selectedScrollSnap() + 1]
    );

    carouselApi.on("select", () => {
      setOrderbookActiveTab(
        OrderbookActiveTabMap[carouselApi.selectedScrollSnap() + 1]
      );
    });
  }, [carouselApi]);

  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold">OrderBook & Trades</p>
      {isDesktop ? (
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
              baseCurrency={baseCurrency}
              quoteCurrency={quoteCurrency}
            />
          </TabsContent>
          <TabsContent value="sell">
            {" "}
            <OrdersTable
              orders={orders.slice(0, 10)}
              isLoading={OrdersIsLoading}
              type="sell"
              baseCurrency={baseCurrency}
              quoteCurrency={quoteCurrency}
            />
          </TabsContent>
          <TabsContent value="trade">
            <TradesTable
              trades={trades.slice(0, 10)}
              isLoading={tradesIsLoading}
              baseCurrency={baseCurrency}
              quoteCurrency={quoteCurrency}
            />
          </TabsContent>
        </Tabs>
      ) : (
        <Carousel setApi={setCarouselApi} className="mt-8">
          <div className="w-full text-sm mb-4 flex items-center gap-2">
            <button
              onClick={() => setOrderbookActiveTab("buy")}
              className={cn("p-2", {
                "border-b-2 border-primary-400": orderbookActiveTab === "buy",
              })}
            >
              Buy
            </button>
            <button
              onClick={() => setOrderbookActiveTab("sell")}
              className={cn("p-2", {
                "border-b-2 border-primary-400": orderbookActiveTab === "sell",
              })}
            >
              Sell
            </button>
            <button
              onClick={() => setOrderbookActiveTab("trade")}
              className={cn("p-2", {
                "border-b-2 border-primary-400": orderbookActiveTab === "trade",
              })}
            >
              Trades
            </button>
          </div>

          <CarouselContent>
            <CarouselItem>
              <OrdersTable
                orders={orders.slice(0, 10)}
                isLoading={OrdersIsLoading}
                type="buy"
                baseCurrency={baseCurrency}
                quoteCurrency={quoteCurrency}
              />
            </CarouselItem>
            <CarouselItem>
              <OrdersTable
                orders={orders.slice(0, 10)}
                isLoading={OrdersIsLoading}
                type="sell"
                baseCurrency={baseCurrency}
                quoteCurrency={quoteCurrency}
              />
            </CarouselItem>
            <CarouselItem>
              <TradesTable
                trades={trades.slice(0, 10)}
                isLoading={tradesIsLoading}
                baseCurrency={baseCurrency}
                quoteCurrency={quoteCurrency}
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      )}
    </div>
  );
}
