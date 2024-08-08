import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Theme = "light" | "dark"

interface IFavStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const useTheme = create<IFavStore>()(
  immer(
    devtools(
      persist(
        (set) => ({
          theme : "light",
          setTheme: (theme) =>
            set(
              (state) => {
                state.theme = theme;
              },
              false,
              "set Theme",
            ),
        }),
        { name: "theme" },
      ),
      { name: "theme" },
    ),
  ),
);

export default useTheme;
