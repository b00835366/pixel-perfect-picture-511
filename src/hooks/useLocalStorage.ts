import { useCallback, useEffect, useState } from "react";

const EVT = "recre:storage";

export function useLocalStorage<T>(key: string, initial: T) {
  const full = `recre:${key}`;
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    const read = () => {
      try {
        const raw = window.localStorage.getItem(full);
        setValue(raw ? (JSON.parse(raw) as T) : initial);
      } catch {
        /* ignore */
      }
    };
    read();
    window.addEventListener(EVT, read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener(EVT, read);
      window.removeEventListener("storage", read);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [full]);

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const v = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          window.localStorage.setItem(full, JSON.stringify(v));
          setTimeout(() => window.dispatchEvent(new Event(EVT)), 0);
        } catch {
          /* ignore */
        }
        return v;
      });
    },
    [full],
  );

  return [value, set] as const;
}
