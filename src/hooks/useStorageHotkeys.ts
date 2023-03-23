/* eslint-disable consistent-return */
import { emitOpenFiles } from 'helpers';
import { useRef, useEffect } from 'react';
import { useTypedSelector } from './redux/useTypedSelector';
import { useStorageHandlers } from './useStorageHandlers';

export const useStorageHotkeys = () => {
  const workplaceRef = useRef<HTMLDivElement | null>(null);
  const { currentItems } = useTypedSelector((state) => state.storage);
  const {
    openModal,
    openModalCheck,
    changeIsTrashHandler,
    changeCurrentArrow,
    restoreItemsHandler,
    openChangeModal,
    copyFilesHandler,
    openInfo,
    openWorkpaceItem,
    downloadArchiveHandler,
    changeStared,
  } = useStorageHandlers();

  useEffect(() => {
    const { current } = workplaceRef;
    if (!current) return;

    current.tabIndex = -1;
    current.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      const key = e.key.toLowerCase();
      const cntr = e.ctrlKey;
      const shift = e.shiftKey;

      if (shift) {
        switch (key) {
          case 'f': {
            openModal('isCreateFolder', false);
            return;
          }

          case 'a': {
            openModal('isCreateAlbum', false);
            return;
          }

          case 't': {
            openModal('isCreateTrack', false);
            return;
          }

          case 'v': {
            openModal('isCreateVideo', false);
            return;
          }

          case 's': {
            openModal('isSettings');
            return;
          }

          case 'h': {
            openModal('isHotkeys');
            return;
          }

          default:
            return;
        }
      }

      if (cntr) {
        switch (key) {
          case 'u': {
            emitOpenFiles();
            return;
          }

          case 'z': {
            restoreItemsHandler();
            return;
          }

          default:
            return;
        }
      }

      switch (key) {
        case 'arrowup': {
          // ! Fix
          // changeCurrentArrow(1);
          return;
        }

        case 'arrowdown': {
          // ! Fix
          // changeCurrentArrow(-1);
          return;
        }

        case 'enter': {
          openWorkpaceItem();
          return;
        }

        case 'delete': {
          changeIsTrashHandler(true);
          return;
        }

        case 'a': {
          openModalCheck('isChangeAccess', false);
          return;
        }

        case 's': {
          // ! fix
          changeStared(true);
          return;
        }

        case 'l': {
          openModalCheck('isGetLink', false);
          return;
        }

        case 'n': {
          openModalCheck('isRename', false);
          return;
        }

        case 'z': {
          openModalCheck('isChangeParent', false);
          return;
        }

        case 'i': {
          openInfo();
          return;
        }

        case 'd': {
          downloadArchiveHandler();
          return;
        }

        case 'e': {
          openChangeModal();
          return;
        }

        case 'c': {
          copyFilesHandler();
          break;
        }

        default:
          break;
      }
    };

    current.addEventListener('keydown', handleKeyDown);

    return () => {
      current.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentItems, restoreItemsHandler]);

  return {
    workplaceRef,
  };
};
