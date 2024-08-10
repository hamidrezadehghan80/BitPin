import { OrderSideType } from "../../../libs/endpoints/trade/trade-schema";

export default function BuySellToggle({
  activeSide,
  onChange,
}: {
  activeSide: OrderSideType;
  onChange: (side: OrderSideType) => void;
}) {
  const isBuyActive = activeSide === "buy";
  const isSellActive = activeSide === "sell";

  return (
    <div
      className={`flex h-8 w-full overflow-hidden rounded bg-neutral-200 text-sm text-neutral-500 dark:bg-neutral-800`}
    >
      <button
        onClick={() => onChange("buy")}
        className={`flex-1 font-semibold uppercase ${
          isBuyActive ? "bg-success-500  text-neutral-100" : ""
        }`}
      >
        Buy
      </button>
      <div className="w-8">
        {isBuyActive && <BuyArrow key="buy" />}
        {isSellActive && <SellArrow key="sell" />}
      </div>
      <button
        onClick={() => onChange("sell")}
        className={`flex-1 font-semibold uppercase ${
          isSellActive ? "bg-error-500 text-neutral-100" : ""
        }`}
      >
        Sell
      </button>
    </div>
  );
}

const BuyArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="none"
    className=" size-8 fill-success-500 rtl:-scale-x-100"
  >
    <path d="M0 0L13.8431 0C14.904 0 15.9214 0.421427 16.6716 1.17157L28.6716 13.1716C30.2337 14.7337 30.2337 17.2663 28.6716 18.8284L16.6716 30.8284C15.9214 31.5786 14.904 32 13.8431 32H0V0Z" />
  </svg>
);

const SellArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="none"
    className="size-8 fill-error-500 rtl:-scale-x-100"
  >
    <path d="M32 0L18.1569 0C17.096 0 16.0786 0.421427 15.3284 1.17157L3.32842 13.1716C1.76633 14.7337 1.76633 17.2663 3.32843 18.8284L15.3284 30.8284C16.0786 31.5786 17.096 32 18.1569 32H32V0Z" />
  </svg>
);
