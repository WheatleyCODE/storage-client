import React, { FC, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AiOutlineSearch } from 'react-icons/ai';
import { useValidInput } from 'hooks';
import { Input } from 'components';
import './Search.scss';

export const Search: FC = memo(() => {
  const search = useValidInput([]);

  return (
    <div className="search">
      <Input
        Icon={AiOutlineSearch}
        value={search.value}
        type="text"
        placeholder="Поиск..."
        onChange={search.onChange}
        onBlur={search.onBlur}
        isError={search.isError}
        validError={search.validError}
      />
      <AnimatePresence>
        {search.value && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 100, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="search__responce"
          >
            <div>Hello</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
