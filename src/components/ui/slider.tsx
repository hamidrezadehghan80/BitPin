import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "../../libs/utils";
import { useDebounce } from "@uidotdev/usehooks";
import { OrderSideType } from "../../libs/endpoints/trade/trade-schema";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    side: OrderSideType;
  }
>(({ className, ...props }, ref) => {
  const value = (props.value || [0])[0];
  const debouncedValue = useDebounce(value, 1000);
  const side = props.side;

  return (
    <SliderPrimitive.Root
      dir="ltr"
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className="bg-neutral-100 dark:bg-neutral-800 relative h-2 w-full grow overflow-hidden rounded-full">
        <SliderPrimitive.Range
          className={`absolute h-full ${
            side === "sell" ? "bg-error-500 " : "bg-primary-400 "
          }`}
        />
      </SliderPrimitive.Track>
      {props["aria-label"] !== "hidden" && (
        <span
          className={`${
            debouncedValue !== value ? "opacity-100" : "opacity-0"
          } absolute bottom-0 mb-[20px] -translate-x-1/2 whitespace-nowrap text-sm font-semibold transition-opacity ease-in`}
          style={{
            left: `calc(${(props.value || [0])[0]}% + ${
              ((50 - (props.value || [0])[0]) / 50) * 10
            }px)`,
          }}
        >
          {Math.ceil((props.value || [0])[0])}{" "}
          {props["aria-label"] !== "hidden" && "%"}
        </span>
      )}

      <SliderPrimitive.Thumb
        className={`relative block h-4 w-4 rotate-45 cursor-grab rounded-sm border-4 ${
          side === "sell"
            ? "border-error-500 dark:border-error-500"
            : "border-primary-400 dark:border-primary-400"
        } bg-gray-100 transition-colors active:cursor-grabbing  disabled:pointer-events-none disabled:opacity-50  dark:bg-gray-600`}
      />
    </SliderPrimitive.Root>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
