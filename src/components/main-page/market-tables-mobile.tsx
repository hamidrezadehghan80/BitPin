import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { IMarket } from "../../libs/endpoints/markets/markets-schema";
import DisplayPercent from "../common/display-percent";
import {
  cn,
  createArray,
  formatCurrency,
  getBigNumberAbbreviate,
} from "../../libs/utils";
import { ChartBar, Star } from "@phosphor-icons/react";
import { useState } from "react";
import Pagination from "../pagination/pagination";
import { Skeleton } from "../ui/skeleton";
import NotFoundCard from "../common/not-found-card";
import useFavoriteMarketsStore from "../../libs/store/favorite-markets-store";

export default function MarketsTableMobile({
  marketsList,
  isLoading,
}: {
  marketsList: IMarket[];
  isLoading: boolean;
}) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalCount = marketsList.length;
  const pageSize = 10;

  return (
    <div className="flex flex-col gap-4">
      <Table>
        <TableHeader>
          <TableRow className="text-xs text-neutral-500">
            <TableHead>Name</TableHead>
            <TableHead className="text-end">Price/24h Change</TableHead>
            <TableHead className="text-end">Vol/Cap</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <>
              {createArray(10).map((item) => (
                <MarketsTableMobileRowSkeleton key={item} />
              ))}
            </>
          ) : (
            <>
              {marketsList.length > 0 ? (
                <>
                  {marketsList
                    .slice(pageSize * (currentPage - 1), pageSize * currentPage)
                    .map((market) => (
                      <MarketsTableMobileRow market={market} key={market.id} />
                    ))}
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <div className="flex items-center w-full justify-center">
                      <NotFoundCard />
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>
      {totalCount > pageSize && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          totalCount={totalCount}
          className="w-full flex-1 flex items-center justify-center"
        />
      )}
    </div>
  );
}

const MarketsTableMobileRow = ({ market }: { market: IMarket }) => {
  const { toggleFavorite, favoriteMarkets } = useFavoriteMarketsStore();

  return (
    <TableRow className=" font-semibold hover:bg-neutral-100 text-xs dark:hover:bg-neutral-800 cursor-pointer">
      <TableCell className="font-semibold">
        <div className="flex items-center gap-1">
          <button onClick={() => toggleFavorite(market.id)}>
            <Star
              className={cn("size-4 md:size-[18px]", {
                "text-primary-400": favoriteMarkets[market.id],
              })}
              weight={favoriteMarkets[market.id] ? "fill" : "regular"}
            />
          </button>

          <img
            width={28}
            height={28}
            // className="rounded-full"
            alt=""
            src={market.currency1.image}
          />
          <div className="flex flex-col">
            <p>
              {market.currency1.code}{" "}
             
            </p>
            <p className="text-neutral-500">{market.currency1.title}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-end">
        <div className="flex flex-col">
          <p>{formatCurrency(market.price)}</p>
          <DisplayPercent
            number={market.price_info.change?.toString() || "0"}
            nextText={"%"}
            className="text-xs"
          />
        </div>
      </TableCell>
      <TableCell className="text-end">
        <div className="flex flex-col">
          <p>{getBigNumberAbbreviate(+market.volume_24h, 2)}</p>
          <p className="font-normal text-xs">
            {" "}
            {getBigNumberAbbreviate(+market.market_cap, 2)}
          </p>
        </div>
      </TableCell>
    </TableRow>
  );
};

const MarketsTableMobileRowSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-7 w-full min-w-36" />
      </TableCell>
      <TableCell>
        <Skeleton className="ms-auto h-7 w-full max-w-52" />
      </TableCell>
      <TableCell>
        <Skeleton className="ms-auto h-7 w-full max-w-52" />
      </TableCell>
      <TableCell>
        <Skeleton className="ms-auto h-7 w-full max-w-52" />
      </TableCell>
      <TableCell>
        <Skeleton className="ms-auto h-7 w-full max-w-52" />
      </TableCell>
      <TableCell>
        <Skeleton className="ms-auto h-7 w-full max-w-52" />
      </TableCell>
    </TableRow>
  );
};

// {
//   "id": 2,
//   "currency1": {
//     "id": 1,
//     "title": "Bitcoin",
//     "title_fa": "بیت کوین",
//     "code": "BTC",
//     "tradable": true,
//     "for_test": false,
//     "image": "https://cdn.bitpin.org/media/market/currency/1697370601.svg",
//     "decimal": 2,
//     "decimal_amount": 8,
//     "decimal_irt": 0,
//     "color": "f7931a",
//     "high_risk": false,
//     "show_high_risk": false,
//     "withdraw_commission": "0.003000000000000000",
//     "tags": [
//       {
//         "id": 44,
//         "name": "لایه ۱",
//         "name_en": "layer-1",
//         "has_chart": true
//       },
//       {
//         "id": 52,
//         "name": "اثبات کار",
//         "name_en": "pow",
//         "has_chart": true
//       }
//     ],
//     "etf": false,
//     "for_binvest": false,
//     "for_loan": true,
//     "for_stake": false,
//     "recommend_for_deposit_weight": 1
//   },
//   "currency2": {
//     "id": 4,
//     "title": "Tether",
//     "title_fa": "تتر",
//     "code": "USDT",
//     "tradable": true,
//     "for_test": false,
//     "image": "https://cdn.bitpin.org/media/market/currency/1697373576.svg",
//     "decimal": 1,
//     "decimal_amount": 2,
//     "decimal_irt": 0,
//     "color": "26a17b",
//     "high_risk": false,
//     "show_high_risk": false,
//     "withdraw_commission": "25.000000000000000000",
//     "tags": [
//       {
//         "id": 6,
//         "name": "استیبل کوین",
//         "name_en": "stablecoins",
//         "has_chart": true
//       },
//       {
//         "id": 39,
//         "name": "محبوب",
//         "name_en": "popular",
//         "has_chart": false
//       }
//     ],
//     "etf": false,
//     "for_binvest": false,
//     "for_loan": true,
//     "for_stake": false,
//     "recommend_for_deposit_weight": 3
//   },
//   "tradable": true,
//   "otc_tradable": true,
//   "coming_soon": false,
//   "for_test": false,
//   "otc_sell_percent": "0.00800",
//   "otc_buy_percent": "0.00800",
//   "otc_max_buy_amount": "0.033000000000000000",
//   "otc_max_sell_amount": "0.033000000000000000",
//   "order_book_info": {
//     "created_at": null,
//     "price": "57457.14",
//     "change": 0.0054,
//     "min": "54543.76",
//     "max": "57698.99",
//     "time": "2024-08-08T11:34:51.000Z",
//     "mean": "56292.23",
//     "value": "84493.97",
//     "amount": "1.49770066"
//   },
//   "internal_price_info": {
//     "created_at": 1723116892.429503,
//     "price": "57457.14",
//     "change": 0.54,
//     "min": "54543.76",
//     "max": "57698.99",
//     "time": null,
//     "mean": null,
//     "value": null,
//     "amount": null
//   },
//   "price_info": {
//     "created_at": 1723117113.918,
//     "price": "57504.20",
//     "change": 0.7299,
//     "min": "54580.60",
//     "max": "57630.00",
//     "time": null,
//     "mean": null,
//     "value": null,
//     "amount": null
//   },
//   "price": "57504.20",
//   "title": "Bitcoin/Tether",
//   "code": "BTC_USDT",
//   "title_fa": "بیت کوین/تتر",
//   "trading_view_source": "BINANCE",
//   "trading_view_symbol": "BTCUSDT",
//   "otc_market": false,
//   "text": "",
//   "volume_24h": "44748676898.000000000000000000",
//   "market_cap": "837148080052.000000000000000000",
//   "circulating_supply": "19588837.000000000000000000",
//   "all_time_high": "69045.000000000000000000",
//   "popularity_weight": 0,
//   "freshness_weight": 0,
//   "price_increment": null
// }
