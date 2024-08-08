import { ReactNode } from "react";
import { cn } from "../../libs/utils";

export default function DisplayPercent({
  number,
  className,
  beforeText,
  nextText,
}: {
  number: string;
  className?: string;
  beforeText?: ReactNode;
  nextText?: ReactNode;
}) {

  return (
    <span
      className={cn(
        "rtl:text-right rtl:[direction:ltr] text-neutral-500",
        className,
        {
          "text-teal-500": +number > 0,
          "text-red-500": +number < 0,
        }
      )}
    >
      {beforeText}
      {+number > 0 ? "+" : ""}
      {number}
      {nextText}
    </span>
  );
}
