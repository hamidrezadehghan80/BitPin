import { useMemo, useState } from "react";
import { tradeHooks } from "../../../libs/endpoints/trade/trade-endpoints";
import { Input } from "../../ui/input";
import {
  divide,
  isGreaterThan,
  isLessThanOrEqual,
  minus,
  sum,
  times,
} from "../../../libs/math";

export default function OrderForm({ marketId }: { marketId: string }) {
  const { data: ordersData, isLoading: OrdersIsLoading } =
    tradeHooks.useQueryAllOrders(
      {
        params: {
          id: marketId,
        },
        queries: {
          type: "buy",
        },
      },
      {
        refetchInterval: 3000,
      }
    );

  const orders = [...(ordersData?.orders || []).slice(0, 10).reverse()];

  const [rate, setRate] = useState<string>("0");

  const { totalRemain, rateRemain, accumulatedValue, avgPrice } =
    useMemo(() => {
      const totalRemain = orders.reduce(
        (acc, order) => sum(acc, order.remain),
        "0"
      );

      const rateRemain = divide(times(totalRemain, +rate), "100");

      let accumulatedRemain = "0";
      let accumulatedValue = "0";

      for (const order of orders) {
        if (
          isLessThanOrEqual(sum(accumulatedRemain, order.remain), rateRemain)
        ) {
          accumulatedRemain = sum(accumulatedRemain, order.remain);
          accumulatedValue = sum(accumulatedValue, order.value);
        } else {
          const remainingRemain = minus(rateRemain, accumulatedRemain);
          accumulatedRemain = sum(accumulatedRemain, remainingRemain);
          accumulatedValue = sum(
            accumulatedValue,
            times(remainingRemain, order.price)
          );
          break;
        }
      }

      const avgPrice =
        +rateRemain > 0 ? divide(accumulatedValue, rateRemain) : "0";

      return {
        totalRemain,
        rateRemain,
        accumulatedValue,
        avgPrice,
      };
    }, [orders, rate]);

  console.log({
    totalRemain,
    rateRemain,
    accumulatedValue,
    avgPrice,
  });

  return (
    <div className="flex flex-col">
      <Input value={rate} onChange={(e) => setRate(e.target.value)} />
    </div>
  );
}
