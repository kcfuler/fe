import { ReactElement, Ref, useCallback, useRef } from "react";

export const useCombineRef = (...refs: Ref<any>[]) => {
  return useCallback(
    (element: ReactElement) => {
      refs.forEach((ref) => {
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
