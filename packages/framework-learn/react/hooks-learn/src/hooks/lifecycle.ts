import { useEffect, useRef } from "react";
import useLatest from "./useLatest";

const useMount = (fn: () => void): void => {
  useEffect(() => {
    fn?.();
  }, []);
};

const useUnmount = (fn: () => void): void => {
  const fnRef = useLatest(fn);

  useEffect(() => {
    return () => {
      fnRef.current();
    };
  }, []);
};

const useUnmountedRef = (): { readonly current: boolean } => {
  const unmountedRef = useRef<boolean>(false);

  useEffect(() => {
    unmountedRef.current = false;
    return () => {
      unmountedRef.current = true;
    };
  }, []);

  return unmountedRef;
};

export default useUnmountedRef;

export { useMount, useUnmount };
