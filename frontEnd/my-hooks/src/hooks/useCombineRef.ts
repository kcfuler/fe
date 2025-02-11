import { useCallback, Ref } from "react";

type RefItem<T> =
  | ((element: T | null) => void)
  | Ref<T | null>
  | null
  | undefined;

export const useCombineRef = <T>(...refs: RefItem<T>[]) => {
  return useCallback(
    (element: T) => {
      refs.forEach((ref) => {
        if (!ref) return;
        if (typeof ref === "function") {
          ref(element);
        } else if (ref) {
          ref.current = element;
        }
      });
    },
    [refs]
  );
};
