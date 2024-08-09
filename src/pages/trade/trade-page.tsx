import { useParams } from "react-router-dom";
import { tradeHooks } from "../../libs/endpoints/trade/trade-endpoints";
import OrderBook from "../../components/trade-page/orderbook/orderbook";


export default function TradePage() {
  const { id = "" } = useParams();

  return (
    <div className="flex flex-col mt-16 gap-4">
      <div className="flex flex-col">
        <h2 className="md:text-3xl text-2xl font-medium">Market Trade</h2>
        <p className="text-neutral-500 text-sm">Today's Market Trades</p>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
       <OrderBook marketId={id}/>
      </div>
    </div>
  );
}
