import { OrderSideType } from "../../../libs/endpoints/trade/trade-schema";
import { Slider } from "../../ui/slider";

function range(n: number): number[] {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
  return arr;
}

export default function QuickPercentSlider({
  percent: _percent,
  setPercent,
  disabled,
  side,
  max,
  min,
  hidePercentSymbol,
  pointCount = 5,
}: {
  percent: number;
  setPercent: (percent: number) => any;
  disabled?: boolean;
  side: OrderSideType;
  max?: number;
  min?: number;
  hidePercentSymbol?: boolean;
  pointCount?: number;
}) {
  const maximum = max ? max : 100;
  const minimum = min ? min : 0;
  const length = maximum - minimum;

  const listButtons = range(pointCount);

  const percent = Math.min(_percent, max || 100);

  return (
    <div className="relative w-full">
      {listButtons.map((num) => {
        const leftPercent =
          ((length * (num / (pointCount - 1))) / length) * 100;

        let style = {};

        if (leftPercent === 100) {
          style = {
            right: "0",
          };
        } else if (num >= Math.floor(pointCount / 2) && num < pointCount - 1) {
          style = {
            left: `${leftPercent - 2}%`,
          };
        } else {
          style = {
            left: `${leftPercent}%`,
          };
        }

        return (
          <div
            key={num}
            onClick={() =>
              setPercent(
                Math.floor(minimum + length * (num / (pointCount - 1))),
              )
            }
            className={`${
              percent <= length * (num / (pointCount - 1))
                ? " bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800"
                : ` ${
                    side === "sell" ? "!bg-error-500" : "!bg-primary-400"
                  } dark:border-neutral-600`
            } absolute top-1/2  z-10 block h-3 w-3 -translate-y-1/2 rotate-45 cursor-pointer rounded-sm border-2  border-neutral-200  p-0.5 transition-colors disabled:pointer-events-none  disabled:opacity-50 dark:border-neutral-600 `}
            style={style}
          />
        );
      })}

      <Slider
        side={side}
        defaultValue={[percent]}
        value={[percent]}
        onValueChange={(numberList) => setPercent(numberList[0])}
        max={maximum}
        min={minimum}
        step={1}
        disabled={disabled}
        aria-label={hidePercentSymbol ? "hidden" : ""}
        className={`relative my-6 rounded-md bg-neutral-200 ${
          side === "sell" ? "text-error-500" : "text-primary-400"
        } dark:bg-neutral-700 [&>span:last-child]:z-20`}
      />
    </div>
  );
}
