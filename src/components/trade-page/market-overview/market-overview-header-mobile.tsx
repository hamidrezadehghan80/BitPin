import { ArrowsDownUp } from "@phosphor-icons/react";
import { IMarket } from "../../../libs/endpoints/markets/markets-schema";
import DisplayPercent from "../../common/display-percent";
import { Button } from "../../ui/button";
import { Sheet, SheetContent } from "../../ui/sheet";
import MarketsListComponent from "./markets-list-component";
import { useState } from "react";
import { Skeleton } from "../../ui/skeleton";
import { formatCurrency } from "../../../libs/utils";

export default function MarketOverviewNavbarMobile({
  markets,
  market,
  isLoading,
}: {
  markets: IMarket[];
  market?: IMarket;
  isLoading: boolean;
}) {
  const [isMarketsListSheetOpen, setMarketsListSheetOpen] =
    useState<boolean>(false);

  return (
    <>
      {isLoading ? (
        <MarketOverviewSkeletonMobile />
      ) : (
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-1 items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img
                alt=""
                src={market?.currency1.image || ""}
                width={64}
                height={64}
                className="size-8 rounded-full"
              />
              <div className="flex flex-col">
                <p className="text-sm font-semibold md:text-base">
                  {market?.title.replace("_", "/")}
                </p>

                <p className="text-xs md:text-sm">
                  {market?.code.replace("_", "/")}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <p className="text-sm font-semibold md:text-base">
                {formatCurrency((+(market?.price || "")).toFixed(2))}
              </p>

              <DisplayPercent
                number={market?.price_info.change + ""}
                beforeText=" ("
                nextText="%)"
                className="text-xs"
              />
            </div>
          </div>
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => setMarketsListSheetOpen(true)}
            className="hover:text-secondary-3 hover:dark:text-secondary-3 md:hidden"
          >
            <ArrowsDownUp className="size-6" />
          </Button>
          <MarketsListSheet
            open={isMarketsListSheetOpen}
            setOpen={setMarketsListSheetOpen}
            markets={markets}
          />
        </div>
      )}
    </>
  );
}

const MarketsListSheet = ({
  open,
  setOpen,
  markets,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  markets: IMarket[];
}) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side={"left"}
        tabIndex={-1}
        className="flex h-full flex-col pt-16"
      >
        <MarketsListComponent
          markets={markets}
          onMarketClick={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
};

const MarketOverviewSkeletonMobile = () => {
  return (
    <div className="flex flex-1 items-center justify-between gap-4">
      <Skeleton className="w-full max-w-36 h-10" />

      <Skeleton className="w-full max-w-32 h-10" />
    </div>
  );
};
