import React from 'react';

import './GlobalSearch.scss';

const GlobalSearch = ({ placeholder = 'Search something' }) => {
  return (
    <div className="global-search flex flex-col">
      <input type="text" placeholder={placeholder} />
    </div>
  );
};

export default GlobalSearch;
