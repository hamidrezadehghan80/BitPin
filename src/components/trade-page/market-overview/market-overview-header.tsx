import { CaretDown } from "@phosphor-icons/react";
import { IMarket } from "../../../libs/endpoints/markets/markets-schema";
import DisplayPercent from "../../common/display-percent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import MarketsListComponent from "./markets-list-component";
import { Skeleton } from "../../ui/skeleton";
import { formatCurrency } from "../../../libs/utils";

export default function MarketOverviewNavbar({
  markets,
  market,
  isLoading,
}: {
  markets: IMarket[];
  market?: IMarket;
  isLoading: boolean;
}) {
  return (
    <>
      {isLoading ? (
        <MarketOverviewSkeleton />
      ) : (
        <div className="flex flex-1 items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              alt=""
              src={market?.currency1.image || ""}
              width={64}
              height={64}
              className="size-8 rounded-full"
            />{" "}
            <div className="flex flex-col">
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="group p-0 px-0 focus-within:outline-none"
                >
                  <button className="flex items-center gap-2 text-sm font-semibold md:text-base">
                    <p>{market?.title.replace("_", "/")}</p>
                    <CaretDown className="size-4 transition-transform group-data-[state=open]:rotate-180" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="bg-neutral-100 p-3 dark:bg-neutral-900"
                >
                  <MarketsListComponent markets={markets} />
                </DropdownMenuContent>
              </DropdownMenu>

              <p className="text-xs md:text-sm">
                {market?.code.replace("_", "/")}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <p className="text-sm font-semibold md:text-base">
              {formatCurrency(market?.price) }
            </p>

            <DisplayPercent
              number={market?.price_info.change + ""}
              beforeText=" ("
              nextText="%)"
              className="text-xs"
            />
          </div>
        </div>
      )}
    </>
  );
}

const MarketOverviewSkeleton = () => {
  return (
    <div className="flex flex-1 items-center justify-between gap-4">
      <Skeleton className="w-full max-w-64 h-12" />
      <Skeleton className="w-full max-w-56 h-12" />
    </div>
  );
};
