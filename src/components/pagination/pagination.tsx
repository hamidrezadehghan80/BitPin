import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { usePagination } from "./use-pagination";

interface propTypes {
  totalCount: number;
  pageSize: number;
  setCurrentPage: (val: any) => void;
  currentPage: number;
  siblingCount?: number;
  className?: string;
}

const Pagination = ({
  totalCount,
  pageSize,
  setCurrentPage,
  currentPage,
  siblingCount = 1,
  className,
}: propTypes) => {
  const totalPagesCount = Math.ceil(totalCount / pageSize);

  const pagesRangeArray = usePagination({
    currentPage,
    pageSize,
    totalCount,
    siblingCount,
  });

  const handlePagination = (payload: "next" | "perv" | number) => {
    if (payload === "next" && currentPage !== totalPagesCount) {
      setCurrentPage(currentPage + 1);
    }
    if (payload === "perv" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    if (pagesRangeArray?.includes(payload)) {
      setCurrentPage(payload);
    }
  };

  return (
    <div className="my-2 w-full text-sm md:text-base">
      <div className="mx-auto flex h-full w-fit items-center justify-center rounded-md border p-1 dark:border-neutral-600">
        <button
          disabled={currentPage <= 1}
          onClick={() => handlePagination("perv")}
          className={`${
            currentPage <= 1
              ? "!bg-transparent text-neutral-300 dark:text-neutral-400"
              : ""
          } mx-1 rounded p-2 transition-all hover:bg-neutral-200/50 hover:dark:bg-neutral-700/50`}
        >
          <CaretLeft className="size-4" />
        </button>
        <div className="h-[20px] w-[1px] bg-neutral-300 dark:bg-neutral-600"></div>
        <div className="w-full">
          {(pagesRangeArray || []).map((i) => (
            <button
              onClick={() =>
                handlePagination((typeof i === "number" && i) || "next")
              }
              className={`${
                i === currentPage
                  ? "text-neutral-900 dark:!text-neutral-100 "
                  : ""
              } px-2 text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 hover:dark:text-neutral-100`}
              key={i}
            >
              {i}
            </button>
          ))}
        </div>
        <div className="h-[20px] w-[1px] bg-neutral-300 dark:bg-neutral-600"></div>
        <button
          onClick={() => handlePagination("next")}
          disabled={currentPage === totalPagesCount}
          className={`${
            currentPage === totalPagesCount
              ? "!bg-transparent text-neutral-300 dark:text-neutral-400"
              : ""
          } mx-1 rounded p-2 transition-all hover:bg-neutral-200/50 hover:dark:bg-neutral-700/50`}
        >
          <CaretRight className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
