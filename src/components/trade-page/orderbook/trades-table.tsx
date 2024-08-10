import { format, fromUnixTime } from "date-fns";
import {
  ITrade,
  OrderSideType,
} from "../../../libs/endpoints/trade/trade-schema";
import { createArray } from "../../../libs/utils";
import { Skeleton } from "../../ui/skeleton";

export default function TradesTable({
  trades,
  isLoading,
  baseCurrency,
  quoteCurrency,
}: {
  trades: ITrade[];
  isLoading: boolean;
  baseCurrency: string;
  quoteCurrency: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="mt-2 flex items-center text-xs text-neutral-500 p-0.5">
        <p className="w-1/3 text-ellipsis whitespace-nowrap">Price({quoteCurrency})</p>
        <p className="w-1/3 text-ellipsis whitespace-nowrap">Amount({baseCurrency})</p>
        <p className="w-1/3 pe-4 text-end">Time</p>
      </div>
      <div className="flex flex-col">
        {isLoading ? (
          <>
            {createArray(10).map((item) => (
              <TradeItemSkeleton key={item} />
            ))}
          </>
        ) : (
          <>
            {trades.map((trade) => (
              <TradeItem
                key={trade.match_id}
                amount={trade.match_amount}
                price={trade.price}
                time={trade.time}
                type={trade.type}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

const TradeItem = ({
  amount,
  price,
  type,
  time,
}: {
  amount: string;
  price: string;
  type: OrderSideType;
  time: number;
}) => {
  return (
    <div className="flex w-full items-center justify-between p-0.5 text-sm">
      <div
        className={`max-w-full flex-1 overflow-hidden text-start ${
          type === "buy" ? "text-success-500" : "text-error-500"
        }`}
      >
        {price}
      </div>

      <div className="max-w-full flex-1 overflow-hidden text-start">
        {amount}
      </div>
      <div className="max-w-full flex-1 overflow-hidden text-end">
        {format(fromUnixTime(time), "HH:mm:ss")}
      </div>
    </div>
  );
};

const TradeItemSkeleton = () => {
  return (
    <div className="relative flex w-full items-center justify-between p-0.5 text-xs">
      <div className="flex-1">
        <Skeleton className="w-full h-4  max-w-32" />
      </div>
      <div className="flex-1 text-start">
        <Skeleton className="w-full h-4  max-w-32" />
      </div>
      <div className="flex-1 text-end">
        <Skeleton className="w-full h-4 ms-auto max-w-32" />
      </div>
    </div>
  );
};
