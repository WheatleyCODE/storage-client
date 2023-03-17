/* eslint-disable consistent-return */
import { useRef, useEffect } from 'react';
import { useTypedSelector } from './redux/useTypedSelector';
import { useStorageHandlers } from './useStorageHandlers';

export const useStorageHotkeys = () => {
  const workplaceRef = useRef<HTMLDivElement | null>(null);
  const { currentItems } = useTypedSelector((state) => state.storage);
  const {
    openModal,
    changeIsTrashHandler,
    changeColorHandler,
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
            break;
          }

          case 'a': {
            openModal('isCreateAlbum', false);
            break;
          }

          case 't': {
            openModal('isCreateTrack', false);
            break;
          }

          case 'v': {
            openModal('isCreateVideo', false);
            break;
          }

          case 's': {
            openModal('isSettings');
            break;
          }

          case 'h': {
            openModal('isHotkeys');
            break;
          }

          default:
            break;
        }
      }

      if (cntr) {
        switch (key) {
          case 'u': {
            console.log('upload');
            break;
          }

          default:
            break;
        }
      }

      switch (key) {
        case 'arrowup': {
          console.log('ArrowUp');
          break;
        }

        case 'arrowdown': {
          console.log('ArrowDown');
          break;
        }

        case 'enter': {
          openWorkpaceItem();
          break;
        }

        case 'delete': {
          changeIsTrashHandler(true);
          break;
        }

        case 'a': {
          openModal('isChangeAccess', false);
          break;
        }

        case 's': {
          // ! fix
          changeStared(true);
          break;
        }

        case 'l': {
          openModal('isGetLink', false);
          break;
        }

        case 'n': {
          openModal('isRename', false);
          break;
        }

        case 'z': {
          openModal('isChangeParent', false);
          break;
        }

        case 'i': {
          openInfo();
          break;
        }

        case 'd': {
          downloadArchiveHandler();
          break;
        }

        case 'e': {
          openChangeModal();
          break;
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
  }, [currentItems]);

  return {
    workplaceRef,
  };
};
