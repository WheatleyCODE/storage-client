import { useLayoutEffect, useState, useCallback, RefObject } from 'react';

export interface IResizeObserverEntry {
  target: HTMLElement;
  contentRect: DOMRectReadOnly;
}

export type Size = [width: number, height: number];

export const useResizeObserver = (
  ref: RefObject<HTMLElement>,
  callback?: (entry: DOMRectReadOnly) => void
): Size => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const resize = useCallback(
    (entries: ResizeObserverEntry[]) => {
      if (!Array.isArray(entries)) return;

      const entry = entries[0];
      setWidth(entry.contentRect.width);
      setHeight(entry.contentRect.height);

      if (callback) callback(entry.contentRect);
    },
    [callback]
  );

  useLayoutEffect(() => {
    if (!ref.current) return () => {};

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return [width, height];
};
