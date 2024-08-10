import { useMemo } from "react";
import {
  IOrder,
  OrderSideType,
} from "../../../libs/endpoints/trade/trade-schema";
import { divide, roundUp, sum, times } from "../../../libs/math";
import { cn, createArray } from "../../../libs/utils";
import { Skeleton } from "../../ui/skeleton";

export default function OrdersTable({
  orders,
  type,
  isLoading,
  baseCurrency,
  quoteCurrency,
}: {
  orders: IOrder[];
  type: OrderSideType;
  isLoading: boolean;
  baseCurrency: string;
  quoteCurrency: string;
}) {
  const maxVolume = Math.max(...orders.map((order) => +order.remain));

  const { totalRemain, totalValue, avgPrice } = useMemo(() => {
    const totalRemain = orders.reduce(
      (acc, order) => sum(acc, order.remain),
      "0"
    );

    const totalValue = orders.reduce(
      (acc, order) => sum(acc, order.value),
      "0"
    );

    const avgPrice = divide(totalValue, totalRemain);

    return {
      totalRemain,
      totalValue,
      avgPrice,
    };
  }, [orders]);

  return (
    <div className="flex flex-col">
      <div className="mt-2 flex items-center text-xs text-neutral-500 p-0.5">
        <p className="flex-1">Price({quoteCurrency})</p>
        <p className="flex-1 text-start">Amount({baseCurrency})</p>
        <p className="flex-1 text-end">Total({quoteCurrency})</p>
      </div>
      <div className="flex flex-col">
        {isLoading ? (
          <>
            {createArray(10).map((item) => (
              <OrderItemSkeleton key={item} />
            ))}
          </>
        ) : (
          <>
            {orders.map((order) => (
              <OrderItem
                key={order.price}
                amount={order.remain}
                price={order.price}
                total={order.value}
                maxVolume={maxVolume}
                type={type}
              />
            ))}
          </>
        )}
      </div>

      <div className="mt-2 flex items-center text-sm text-neutral-500 p-0.5 border-t dark:border-neutral-700">
        <p className="flex-1">{roundUp(avgPrice, 2)}</p>
        <p className="flex-1 text-start">{totalRemain}</p>
        <p className="flex-1 text-end">{totalValue}</p>
      </div>
    </div>
  );
}

const OrderItem = ({
  price,
  amount,
  total,
  maxVolume,
  type,
}: {
  price: string;
  amount: string;
  total: string;
  maxVolume: number;
  type: OrderSideType;
}) => {
  return (
    <div className="relative flex w-full items-center justify-between p-0.5 text-sm">
      <div
        className={` ${
          type === "buy"
            ? "bg-[#e1f2ec] dark:bg-[#142826]"
            : "bg-[#f6e6e8] dark:bg-[#291c22]"
        } absolute z-0 h-full w-full origin-right`}
        style={{ transform: `scale3d(${+amount / maxVolume},1,1)` }}
      ></div>

      <div
        className={`z-[1] max-w-full flex-1 overflow-hidden text-left rtl:text-right ${
          type === "buy" ? "text-success-500" : "text-error-500"
        }`}
      >
        {price}
      </div>

      <div className="z-[1] max-w-full flex-1 overflow-hidden text-left rtl:text-right">
        {amount}
      </div>
      <div className="z-[1] max-w-full flex-1 overflow-hidden text-right rtl:text-left">
        {total}
      </div>
    </div>
  );
};

const OrderItemSkeleton = () => {
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
