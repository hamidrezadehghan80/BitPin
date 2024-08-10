import { ReactNode } from "react";
import { Skeleton } from "../ui/skeleton";

export default function OverviewCard({
  title,
  subTitle,
  icon,
  isLoading,
}: {
  title: string;
  subTitle: ReactNode;
  icon: ReactNode;
  isLoading: boolean;
}) {
  return (
    <div className="flex items-center justify-between  gap-4 bg-neutral-200/60 p-3 text-xs dark:bg-neutral-800 rounded-md md:text-sm">
      <div className="flex flex-col gap-1">
        <p>{title}</p>
        {isLoading ? (
          <Skeleton className="h-7 w-20" />
        ) : (
          <p className="font-semibold">{subTitle}</p>
        )}
      </div>
      <span className="shrink-0">{icon}</span>
    </div>
  );
}
