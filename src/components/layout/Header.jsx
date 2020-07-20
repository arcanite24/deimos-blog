import React from 'react';

import './Header.scss';
import GlobalSearch from '../search/GlobalSearch';
// import HeaderAction from './HeaderAction';

const Header = ({ posts }) => {
  return (
    <header className="header py-4 px-8 flex flex-row align-center">
      <img
        src="/logo-trans.svg"
        alt="Deimos Community"
        style={{ width: '150px' }}
      />

      <GlobalSearch posts={posts} className="ml-auto"></GlobalSearch>

      {/* I'm removing this for now, we don't have an actual use case for this */}
      {/* <div className="header__actions flex flex-row">
        <HeaderAction text="Home" active={true}></HeaderAction>
        <HeaderAction text="CyberSec"></HeaderAction>
        <HeaderAction text="DevOps"></HeaderAction>
      </div> */}
    </header>
  );
};

export default Header;
