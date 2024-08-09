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
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../libs/routes";

export default function MarketsTable({
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
            <TableHead className="text-end">Price</TableHead>
            <TableHead className="text-end">24h Change</TableHead>
            <TableHead className="text-end">24h Volume</TableHead>
            <TableHead className="text-end">Market Cap</TableHead>
            <TableHead className="text-end">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <>
              {createArray(10).map((item) => (
                <MarketsTableRowSkeleton key={item} />
              ))}
            </>
          ) : (
            <>
              {marketsList.length > 0 ? (
                <>
                  {marketsList
                    .slice(pageSize * (currentPage - 1), pageSize * currentPage)
                    .map((market) => (
                      <MarketsTableRow market={market} key={market.id} />
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

const MarketsTableRow = ({ market }: { market: IMarket }) => {
  const { toggleFavorite, favoriteMarkets } = useFavoriteMarketsStore();

  const navigate = useNavigate();

  return (
    <TableRow className=" font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800/60">
      <TableCell className="font-semibold">
        <div className="flex items-center gap-2">
          <button onClick={() => toggleFavorite(market.id)}>
            <Star
              className={cn("size-[18px]", {
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
              <span className="text-neutral-500">{market.currency1.title}</span>
            </p>
            <p className="text-neutral-500 text-xs">
              {market.code.replace("_", "/")}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-end">{formatCurrency(market.price)}</TableCell>
      <TableCell className="text-end">
        <DisplayPercent
          number={market.price_info.change?.toString() || "0"}
          nextText={"%"}
        />
      </TableCell>
      <TableCell className="text-end font-semibold">
        {getBigNumberAbbreviate(+market.volume_24h, 2)}
      </TableCell>
      <TableCell className="text-end">
        {getBigNumberAbbreviate(+market.market_cap, 2)}
      </TableCell>
      <TableCell className="text-end">
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={() => navigate(AppRoutes.Trade + "/" + market.id)}
        >
          <ChartBar className="size-6" weight="duotone" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

const MarketsTableRowSkeleton = () => {
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
