import { Input } from "../../ui/input";
import * as React from "react";
import { numberInputSanitizer } from "../../../libs/utils";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startComponent?: React.ReactNode;
  endComponent?: React.ReactNode;
  maxPrecision: number;
}

const TradeFormInput = React.forwardRef<HTMLInputElement, IProps>(
  (props, ref) => {
    const {
      startComponent,
      endComponent,
      maxPrecision,
      onChange
    } = props;

    return (
      <div className=" flex h-auto items-center justify-between gap-2 rounded-md bg-neutral-100 px-4 text-sm outline  outline-2 outline-transparent transition-colors focus-within:outline-primary-400 hover:outline-primary-400 rtl:[direction:rtl] dark:bg-neutral-800">
        <label className="shrink-0">{startComponent}</label>
        <Input
          {...props}
          ref={ref}
          onChange={(e) =>
            numberInputSanitizer(
              e,
              (e) => onChange?.(e),
              maxPrecision
            )
          }
          maxLength={20}
          className="text-md text-neutral-700 border-0 bg-transparent py-0 text-right outline-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-neutral-200"
        />
        <div className="cursor-default  text-neutral-700 dark:text-neutral-200">
          {endComponent}
        </div>
      </div>
    );
  }
);

export default TradeFormInput;
