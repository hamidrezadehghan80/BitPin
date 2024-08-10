import { ArrowsDownUp, CaretDown, ChartBar } from "@phosphor-icons/react";
import { IMarket } from "../../../libs/endpoints/markets/markets-schema";
import OverviewCard from "../../common/overview-card";
import DisplayPercent from "../../common/display-percent";
import {
  AlignBottomIcon,
  ChartDecreaseIcon,
  ChartIncreaseIcon,
  ChartLineDataIcon,
} from "../../../assets/icons/icons";
import useWindowSize from "../../../libs/hooks/use-window-size";
import { Button } from "../../ui/button";
import MarketOverviewNavbar from "./market-overview-header";
import MarketOverviewNavbarMobile from "./market-overview-header-mobile";
import { formatCurrency } from "../../../libs/utils";

export default function MarketOverview({
  markets,
  market,
  isLoading,
}: {
  markets: IMarket[];
  market?: IMarket;
  isLoading: boolean;
}) {
  const overviewList = [
    {
      label: "Price",
      amount: (
        <span>
          {formatCurrency((market?.price || ""))}
          <DisplayPercent
            number={market?.price_info.change + ""}
            beforeText=" ("
            nextText="%)"
          />
        </span>
      ),
      icon: <ChartLineDataIcon className="size-6 text-primary-400 md:size-7" />,
    },
    {
      label: "24h Volume",
      amount: formatCurrency(
        (market?.volume_24h || "")
      ),
      icon: <AlignBottomIcon className="size-6 text-primary-400 md:size-7" />,
    },
    {
      label: "24h Low",
      amount: formatCurrency((market?.price_info.min || "")),
      icon: <ChartDecreaseIcon className="size-6 text-primary-400 md:size-7" />,
    },
    {
      label: "24h High",
      amount: formatCurrency((market?.price_info.max || "")),
      icon: <ChartIncreaseIcon className="size-6 text-primary-400 md:size-7" />,
    },
  ];

  const { isDesktop } = useWindowSize();

  return (
    <div className="flex flex-col gap-6">
      {isDesktop ? (
        <MarketOverviewNavbar
          market={market}
          markets={markets}
          isLoading={isLoading}
        />
      ) : (
        <MarketOverviewNavbarMobile
          market={market}
          markets={markets}
          isLoading={isLoading}
        />
      )}

      <div className="flex flex-col gap-2">
        <span className="mb-2 mt-4 block text-sm font-semibold text-neutral-700 dark:text-neutral-300 md:text-base">
          Market Overview
        </span>
        <div className="mb-8 grid grid-cols-1 items-stretch gap-4 md:grid-cols-2  xl:grid-cols-4">
          {overviewList.map((item) => (
            <OverviewCard
              key={item.label}
              icon={item.icon}
              title={item.label}
              subTitle={item.amount}
              isLoading={isLoading}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
