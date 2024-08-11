import { useParams } from "react-router-dom";
import { tradeHooks } from "../../libs/endpoints/trade/trade-endpoints";
import OrderBook from "../../components/trade-page/orderbook/orderbook";
import TradeForm from "../../components/trade-page/trade-form/trade-form";
import { marketsHooks } from "../../libs/endpoints/markets/markets-endpoints";
import MarketOverview from "../../components/trade-page/market-overview/market-overview";

export default function TradePage() {
  const { id = "" } = useParams();

  const { data, isLoading } = marketsHooks.useQueryAllMarkets();
  const marketsList = data?.results || [];
  const market = marketsList.find((market) => market.id === +id);

  return (
    <div className="flex flex-col mt-10 gap-4">
      {/* <div className="flex flex-col">
        <h2 className="md:text-3xl text-2xl font-medium">Market Trade</h2>
        <p className="text-neutral-500 text-sm">Today's Market Trades</p>
      </div> */}
      <MarketOverview
        market={market}
        markets={marketsList}
        isLoading={isLoading}
      />

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        <OrderBook
          marketId={id}
          baseCurrency={market?.currency1.code || ""}
          quoteCurrency={market?.currency2.code || ""}
        />
        <TradeForm
          marketId={id}
          baseCurrency={market?.currency1.code || ""}
          quoteCurrency={market?.currency2.code || ""}
        />
      </div>
    </div>
  );
}
