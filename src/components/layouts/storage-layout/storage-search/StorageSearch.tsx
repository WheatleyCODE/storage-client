import React, { FC, memo } from 'react';
import { FaThLarge, FaCog, FaSearch } from 'react-icons/fa';
import { User, Button, Search } from 'components';
import './StorageSearch.scss';

export const StorageSearch: FC = memo(() => {
  return (
    <div className="storage-search">
      <div className="storage-search__user-icon">
        <User />
      </div>
      <div className="storage-search__apps-icon">
        <Button type="icon" Icon={FaThLarge} />
      </div>
      <div className="storage-search__settings-icon">
        <Button type="icon" Icon={FaCog} />
      </div>
      <div className="storage-search__search-icon">
        <Button type="icon" Icon={FaSearch} />
      </div>
      <div className="storage-search__search-input">
        <Search />
      </div>
    </div>
  );
});
