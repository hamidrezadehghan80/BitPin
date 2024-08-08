import { useMemo, useState } from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

import { marketsHooks } from "../../libs/endpoints/markets/markets-endpoints";
import MarketsTable from "./markets-table";
import { cn } from "../../libs/utils";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useDebounce } from "@uidotdev/usehooks";
import useFavoriteMarketsStore from "../../libs/store/favorite-markets-store";
import useWindowSize from "../../libs/hooks/use-window-size";
import MarketsTableMobile from "./market-tables-mobile";

type MarketQuoteCurrencyType = "IRT" | "USDT";

export default function Markets() {
  const { data, isLoading } = marketsHooks.useQueryAllMarkets();
  const marketsList = data?.results || [];

  const { favoriteMarkets } = useFavoriteMarketsStore();

  const [marketQuoteCurrency, setMarketQuoteCurrency] =
    useState<MarketQuoteCurrencyType>("USDT");

  const [isFavoriteMarketsChecked, setFavoriteMarketsChecked] =
    useState<boolean>(false);
  const [marketsSearchQuery, setMarketsSearchQuery] = useState<string>("");

  const debouncedMarketsQuery = useDebounce(marketsSearchQuery, 500);

  const filteredMarkets = useMemo(() => {
    return marketsList.filter((market) => {
      if (market.currency2.code !== marketQuoteCurrency) {
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
      if (isFavoriteMarketsChecked && !favoriteMarkets[market.id]) {
        return false;
      }
      return true;
    });
  }, [
    marketQuoteCurrency,
    marketsList,
    debouncedMarketsQuery,
    isFavoriteMarketsChecked,
  ]);

  const { isDesktop } = useWindowSize();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <h2 className="md:text-3xl text-2xl font-medium">Markets Overview</h2>
        <p className="text-neutral-500 text-sm">
          Today's Cryptocurrency Prices
        </p>
      </div>

      <Tabs
        value={marketQuoteCurrency}
        onValueChange={(value) =>
          setMarketQuoteCurrency(value as MarketQuoteCurrencyType)
        }
        className="md:mt-16 mt-8"
      >
        <TabsList className="w-full md:max-w-52 relative text-sm md:text-base">
          <TabsTrigger value="USDT" className="w-1/2">
            USDT
          </TabsTrigger>
          <TabsTrigger value="IRT" className="w-1/2">
            IRT
          </TabsTrigger>

          <div
            className={cn(
              "h-1 absolute bottom-0 left-0 transition-all from-transparent from-15% via-50% to-85% via-primary-400 to-transparent bg-gradient-to-r w-1/2",
              {
                "left-1/2": marketQuoteCurrency === "IRT",
              }
            )}
          />
        </TabsList>

        <div className="flex items-center justify-between gap-4 flex-wrap mt-8 mb-4 px-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="favorite-markets-checkbox"
              checked={isFavoriteMarketsChecked}
              onCheckedChange={(value) => setFavoriteMarketsChecked(!!value)}
            />
            <Label htmlFor="favorite-markets-checkbox" className="text-xs md:text-sm">
              Only Favorite Markets
            </Label>
          </div>
          <div className="flex items-center gap-2  px-2 rounded-md border border-neutral-300 dark:border-neutral-700 focus-within:border-primary-400">
            <Input
              value={marketsSearchQuery}
              onChange={(e) => setMarketsSearchQuery(e.target.value)}
              className="border-0"
              placeholder="Search..."
            />
            <MagnifyingGlass className="size-6" weight="duotone" />
          </div>
        </div>
        <TabsContent value="IRT">
          {isDesktop ? (
            <MarketsTable marketsList={filteredMarkets} isLoading={isLoading} />
          ) : (
            <MarketsTableMobile
              marketsList={filteredMarkets}
              isLoading={isLoading}
            />
          )}
        </TabsContent>
        <TabsContent value="USDT">
          {isDesktop ? (
            <MarketsTable marketsList={filteredMarkets} isLoading={isLoading} />
          ) : (
            <MarketsTableMobile
              marketsList={filteredMarkets}
              isLoading={isLoading}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
