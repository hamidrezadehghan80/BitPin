import { useMemo, useState } from "react";
import { tradeHooks } from "../../../libs/endpoints/trade/trade-endpoints";
import { Input } from "../../ui/input";
import {
  divide,
  isGreaterThan,
  isLessThanOrEqual,
  minus,
  roundUp,
  sum,
  times,
} from "../../../libs/math";
import { OrderSideType } from "../../../libs/endpoints/trade/trade-schema";
import BuySellToggle from "./buy-sell-toggle";
import TradeFormInput from "./trade-form-input";
import QuickPercentSlider from "./quick-percent-slider";

export default function TradeForm({ marketId }: { marketId: string }) {
  const [activeSide, setActiveSide] = useState<OrderSideType>("buy");

  const { data: ordersData, isLoading: OrdersIsLoading } =
    tradeHooks.useQueryAllOrders(
      {
        params: {
          id: marketId,
        },
        queries: {
          type: activeSide,
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

      const avgPrice = isGreaterThan(rateRemain, "0")
        ? divide(accumulatedValue, rateRemain)
        : "0";

      return {
        totalRemain,
        rateRemain,
        accumulatedValue,
        avgPrice,
      };
    }, [orders, rate]);

  return (
    <div className="flex h-full w-full flex-col gap-6">
      <p className="font-semibold">Order Form</p>
      <BuySellToggle activeSide={activeSide} onChange={setActiveSide} />
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex items-center gap-2 text-xs">
          <p className="text-neutral-500">Avbl</p>
          <p>
            {totalRemain} <span>BTC</span>
          </p>
        </div>
        <TradeFormInput
          startComponent={"Rate"}
          maxPrecision={2}
          onChange={(e) =>
            +e.target.value >= 0 &&
            +e.target.value <= 100 &&
            setRate(e.target.value)
          }
          endComponent={"%"}
          name="rate"
          value={rate}
        />

        <QuickPercentSlider
          percent={+rate}
          setPercent={(p) => setRate(p + "")}
          side={activeSide}
        />
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <TradeFormInput
          startComponent={"Price"}
          maxPrecision={2}
          disabled
          endComponent={"USDT"}
          name="price"
          value={roundUp(avgPrice, 2)}
        />

        <TradeFormInput
          startComponent={"Total"}
          maxPrecision={2}
          disabled
          endComponent={"USDT"}
          name="total"
          value={roundUp(accumulatedValue, 2) }
        />

        <TradeFormInput
          startComponent={"Amount"}
          maxPrecision={8}
          disabled
          endComponent={"BTC"}
          name="total"
          value={roundUp(rateRemain, 8)}
        />
      </div>
    </div>
  );
}
