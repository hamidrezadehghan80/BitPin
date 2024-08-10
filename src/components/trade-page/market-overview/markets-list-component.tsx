import { MagnifyingGlass, Star } from "@phosphor-icons/react";
import { IMarket } from "../../../libs/endpoints/markets/markets-schema";
import { Input } from "../../ui/input";
import DisplayPercent from "../../common/display-percent";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useMemo, useState } from "react";
import useFavoriteMarketsStore from "../../../libs/store/favorite-markets-store";
import { useDebounce } from "@uidotdev/usehooks";
import NotFoundCard from "../../common/not-found-card";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../libs/routes";
import { formatCurrency } from "../../../libs/utils";

export default function MarketsListComponent({
  markets,
  onMarketClick,
}: {
  markets: IMarket[];
  onMarketClick?: () => void;
}) {
  const [activeMarketQuote, setActiveMarketQuote] = useState<string>("USDT");
  const quotes = ["USDT", "IRT"];

  const { favoriteMarkets, toggleFavorite } = useFavoriteMarketsStore();

  const [marketsSearchQuery, setMarketsSearchQuery] = useState<string>("");
  const debouncedMarketsQuery = useDebounce(marketsSearchQuery, 500);

  const filteredMarkets = useMemo(() => {
    return markets.filter((market) => {
      if (
        activeMarketQuote !== "favorite" &&
        market.currency2.code !== activeMarketQuote
      ) {
        return false;
      }
      if (activeMarketQuote === "favorite" && !favoriteMarkets[market.id]) {
        return false;
      }
      if (debouncedMarketsQuery) {
        if (
          !(market.title + market.title_fa + market.code)
            .toLocaleLowerCase()
            .includes(debouncedMarketsQuery.toLocaleLowerCase())
        ) {
          return false;
        }
      }

      return true;
    });
  }, [markets, activeMarketQuote, debouncedMarketsQuery]);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold">Markets</p>
      <Tabs value={activeMarketQuote} onValueChange={setActiveMarketQuote}>
        <div>
          <TabsList className="flex max-w-full items-center justify-start gap-x-2 px-1 text-neutral-500">
            <TabsTrigger
              value="favorite"
              className="p-2 text-sm data-[state=active]:text-primary-400"
            >
              <Star
                className="size-5"
                weight={activeMarketQuote === "favorite" ? "fill" : "regular"}
              />
            </TabsTrigger>
            {quotes.map((market) => (
              <TabsTrigger
                key={market}
                value={market}
                className="rounded-md p-2 text-sm font-semibold hover:bg-primary-400 hover:!text-gray-50 data-[state=active]:text-primary-400"
              >
                {market}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>

      <div className="flex w-full items-center gap-2 rounded-full bg-neutral-50 px-4 dark:bg-neutral-800">
        <Input
          placeholder="Search..."
          className="border-none bg-transparent py-0 outline-none dark:bg-transparent"
          value={marketsSearchQuery}
          onChange={(e) => setMarketsSearchQuery(e.target.value)}
        />
        <MagnifyingGlass className="size-4 shrink-0 text-neutral-500" />
      </div>
      {filteredMarkets.length > 0 ? (
        <div className="mt-2 flex flex-col max-h-full md:max-h-[400px] overflow-y-auto md:min-w-[400px]">
          {filteredMarkets.map((market) => (
            <div
              key={market.id}
              className="flex flex-1 items-center justify-between gap-4 rounded-md p-2 hover:bg-neutral-100 hover:dark:bg-neutral-800"
            >
              <div className="flex items-center gap-2">
                <button onClick={() => toggleFavorite(market.id)}>
                  <Star
                    className={
                      favoriteMarkets[market.id]
                        ? "text-primary-500 size-5"
                        : "text-neutral-500 size-5"
                    }
                    weight={favoriteMarkets[market.id] ? "fill" : "regular"}
                  />
                </button>
                <button
                  className="flex items-center text-start gap-2"
                  onClick={() => {
                    navigate(AppRoutes.Trade + "/" + market.id);
                    onMarketClick?.();
                  }}
                >
                  <img
                    alt=""
                    src={market.currency1.image || ""}
                    width={64}
                    height={64}
                    className="size-6 rounded-full"
                  />
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold">
                      {market.title.replace("_", "/")}
                    </p>
                    <p className="text-xs md:text-sm text-neutral-500">
                      {market.code.replace("_", "/")}
                    </p>
                  </div>
                </button>
              </div>

              <div className="flex flex-col items-end gap-1">
                <p className="text-sm font-semibold">
                  {formatCurrency(market.price)}
                </p>

                <DisplayPercent
                  number={market.price_info.change + ""}
                  beforeText={"("}
                  nextText={"%)"}
                  className="text-xs"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-4">
          <NotFoundCard title="No market found" className="text-sm" />
        </div>
      )}
    </div>
  );
}
