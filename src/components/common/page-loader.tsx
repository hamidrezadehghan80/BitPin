import { ReactNode } from "react";
import Spinner from "./spinner";

export default function PageLoader({
  isLoading,
  children,
}: {
  isLoading?: boolean;
  children: ReactNode;
}) {
  return (
    <>
      {isLoading ? (
        <div className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 ">
          <Spinner />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}