import { ReactNode, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../libs/query-client";
import { Toaster } from "sonner";
import useTheme from "../libs/store/theme-store";

export default function Providers({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  useEffect(() => {
    const root = window.document.body;
    root.classList.remove(theme === "dark" ? "light" : "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        theme={theme}
        closeButton
        toastOptions={{
          style: {
            border:
              theme === "dark"
                ? "border 1px solid #242b33"
                : "border 1px solid #e3e6e8ff",
          },
        }}
        position={"top-right"}
        dir="ltr"
        richColors
      />
      {children}
    </QueryClientProvider>
  );
}
