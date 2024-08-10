import { ReactNode } from "react";
import { Skeleton } from "../ui/skeleton";

export default function OverviewCard({
  title,
  subTitle,
  icon,
  isLoading,
}: {
  title: string;
  subTitle: string;
  icon: ReactNode;
  isLoading: boolean;
}) {
  return (
    <div className="flex items-center justify-between  gap-4 rounded-full bg-neutral-200/70 p-3 px-6 text-xs dark:bg-black-3 md:rounded-md md:bg-neutral-100 md:p-4 md:px-4 md:text-sm lg:text-base">
      <div className="flex flex-col gap-1 md:gap-2">
        <p>{title}</p>
        {isLoading ? (
          <Skeleton className="h-7 w-20" />
        ) : (
          <p className="font-bold md:text-base lg:text-lg">{subTitle}</p>
        )}
      </div>
      <span className="shrink-0">{icon}</span>
    </div>
  );
}
