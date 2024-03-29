import React, { FC, memo, useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdErrorOutline } from 'react-icons/md';
import { FinderService } from 'services';
import { useDebounce, useValidInput } from 'hooks';
import { Input, Popup, PopupMenu } from 'components';
import { getColorClassName, getWorkplaceIcon, getWorkplaceUrl } from 'utils';
import {
  POPUP_MENU_ITEM_HEIGHT,
  POPUP_MENU_MAX_HEIGHT,
  POPUP_MENU_PADDING,
  POPUP_MENU_PADDING_SCROLL,
} from 'consts';
import { IClientItemData } from 'types';
import { PropertyFactory } from 'helpers';
import './Search.scss';

export const Search: FC = memo(() => {
  const [show, setShow] = useState(false);
  const [itemsData, setItemsData] = useState<IClientItemData[]>([]);
  const search = useValidInput();

  const searchReuest = async (text: string) => {
    if (text) {
      const { data } = await FinderService.searchStorageItems(text);
      const iData = data.map((item) => PropertyFactory.create(item));
      setItemsData(iData);
    }
  };

  const openPopup = useCallback(() => {
    setTimeout(() => {
      setShow(true);
    }, 0);
  }, []);

  const closePopup = useCallback(() => {
    setShow(false);
  }, []);

  const debouncedRequest = useDebounce(searchReuest, 300);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      search.onChange(e);
      debouncedRequest(e.target.value);
    },
    [debouncedRequest, search]
  );

  const MemoIcon = memo(MdErrorOutline);

  const menuItems = itemsData.map((itemData) => {
    return {
      title: itemData.name,
      Icon: getWorkplaceIcon(itemData),
      path: getWorkplaceUrl(itemData),
      iconColor: getColorClassName(itemData),
    };
  });

  const popupHeight = menuItems.length
    ? menuItems.length * POPUP_MENU_ITEM_HEIGHT + POPUP_MENU_PADDING
    : 70;

  return (
    <div className={`search ${show ? 'show' : ''}`}>
      <Input
        Icon={AiOutlineSearch}
        value={search.value}
        type="text"
        placeholder="Поиск..."
        onChange={onChange}
        onBlur={search.onBlur}
        onFocus={search.onFocus}
        isError={search.isError}
        validError={search.validError}
        isActive={search.isActive}
        changeFocus={search.changeFocus}
        changeActive={search.changeActive}
        onClick={openPopup}
      />

      <AnimatePresence>
        {show && (
          <Popup
            onClose={closePopup}
            height={
              popupHeight > POPUP_MENU_MAX_HEIGHT
                ? POPUP_MENU_MAX_HEIGHT + POPUP_MENU_PADDING_SCROLL
                : popupHeight
            }
          >
            <PopupMenu onClose={closePopup} items={menuItems} />
            {!itemsData.length && (
              <div className="search__not-found">
                <MemoIcon className="icon" />
                Ничего не найдено
              </div>
            )}
          </Popup>
        )}
      </AnimatePresence>
    </div>
  );
});
