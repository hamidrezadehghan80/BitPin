import { useLayoutEffect, useEffect } from "react";

export default function useIsomorphicLayoutEffect(
  callback: () => void,
  deps: any[],
) {
  const effectHook =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;
  effectHook(callback, deps);
}
