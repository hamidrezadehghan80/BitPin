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
        <Skeleton className="h-8 w-full max-w-52" />
      </TableCell>
      <TableCell>
        <Skeleton className="ms-auto h-8 w-full max-w-52" />
      </TableCell>
      <TableCell>
        <Skeleton className="ms-auto h-8 w-full max-w-52" />
      </TableCell>
    </TableRow>
   
  );
};
