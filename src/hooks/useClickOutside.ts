import { RefObject, useEffect } from 'react';

export type EventTypes = 'click' | 'contextmenu';

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent) => void,
  eventTypes: EventTypes[] = ['click']
) => {
  useEffect(() => {
    const fn = (event: MouseEvent) => {
      const el = ref?.current;

      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    eventTypes.forEach((event) => {
      document.body.addEventListener(event, fn);
    });

    return () => {
      eventTypes.forEach((event) => {
        document.body.removeEventListener(event, fn);
      });
    };
  }, [eventTypes, handler, ref]);
};
