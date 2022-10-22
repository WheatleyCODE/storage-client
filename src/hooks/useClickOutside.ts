import { RefObject, useEffect } from 'react';

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent) => void,
  eventType: 'click' | 'contextmenu' = 'click'
) => {
  useEffect(() => {
    const fn = (event: MouseEvent) => {
      const el = ref?.current;

      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.body.addEventListener(eventType, fn);

    return () => {
      document.body.removeEventListener(eventType, fn);
    };
  }, [eventType, handler, ref]);
};
