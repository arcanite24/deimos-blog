import React from 'react';
import PropTypes from 'prop-types';

import './GlobalSearch.scss';

const GlobalSearch = ({ placeholder = 'Search something' }) => {
  return (
    <div className="global-search flex flex-col">
      <input type="text" placeholder={placeholder} />
    </div>
  );
};

GlobalSearch.propTypes = {
  placeholder: PropTypes.string,
};

export default GlobalSearch;
