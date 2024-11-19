import { useCallback, useState } from "react";

export function useModal(initialState: boolean = false) {
  const [isVisible, setIsVisible] = useState(initialState);

  const open = useCallback(() => setIsVisible(true), []);
  const close = useCallback(() => setIsVisible(false), []);
  const toggle = useCallback(() => setIsVisible((prev) => !prev), []);

  return {
    isVisible,
    open,
    close,
    toggle,
  };
}
