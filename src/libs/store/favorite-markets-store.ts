import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface IFavStore {
  favoriteMarkets: Record<number, boolean>;
  toggleFavorite: (id: number) => void;
}

const useFavoriteMarketsStore = create<IFavStore>()(
  immer(
    devtools(
      persist(
        (set) => ({
          favoriteMarkets: {},

          toggleFavorite: (id) =>
            set(
              (state) => {
                state.favoriteMarkets[id] = !state.favoriteMarkets[id];
              },
              false,
              "toggle favorites",
            ),
        }),
        { name: "favoritesMarkets" },
      ),
      { name: "favoritesMarkets" },
    ),
  ),
);

export default useFavoriteMarketsStore;
