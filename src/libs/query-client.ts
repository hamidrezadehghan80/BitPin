import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (
          error instanceof AxiosError &&
          error.response?.status &&
          error.response?.status >= 500
        ) {
          return false;
        }

        if (error instanceof AxiosError && error.response?.status === 401) {
          return false;
        }

        if (failureCount >= 2) {
          return false;
        }
        return true;
      },
    },
  },
});
