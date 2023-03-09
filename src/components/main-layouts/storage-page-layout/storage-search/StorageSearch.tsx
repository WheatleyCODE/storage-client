import React, { FC, memo } from 'react';
import { User, Search, Apps, Settings, SearchMobile } from 'components';
import './StorageSearch.scss';

export const StorageSearch: FC = memo(() => {
  return (
    <div className="storage-search">
      <div className="storage-search__user-icon">
        <User />
      </div>
      <div className="storage-search__apps-icon">
        <Apps />
      </div>
      <div className="storage-search__settings-icon">
        <Settings />
      </div>
      <div className="storage-search__search-icon">
        <SearchMobile />
      </div>
      <div className="storage-search__search-input">
        <Search />
      </div>
    </div>
  );
});
