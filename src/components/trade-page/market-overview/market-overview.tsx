import { IMarket } from "../../../libs/endpoints/markets/markets-schema";

export default function MarketOverview({
  markets,
  market,
  isLoading,
}: {
  markets: IMarket[];
  market: IMarket;
  isLoading: boolean;
}) {
  return <div>market overview</div>;
}
