import React, { FC, memo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AiOutlineSearch } from 'react-icons/ai';
import { useValidInput } from 'hooks';
import { Input, Popup } from 'components';
import './Search.scss';

export const Search: FC = memo(() => {
  const search = useValidInput();

  return (
    <div className="search">
      <Input
        Icon={AiOutlineSearch}
        value={search.value}
        type="text"
        placeholder="Поиск..."
        onChange={search.onChange}
        onBlur={search.onBlur}
        onFocus={search.onFocus}
        isError={search.isError}
        validError={search.validError}
        isActive={search.isActive}
        changeFocus={search.changeFocus}
        changeActive={search.changeActive}
      />
      <AnimatePresence>
        {search.value && search.isFocus && (
          <Popup onClose={() => {}} height={200}>
            <h2>Hello!</h2>
          </Popup>
        )}
      </AnimatePresence>
    </div>
  );
});
