import React from 'react';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;

  return (
    <div className="w-100 flex flex-col">
      <Header></Header>
      <div className="flex flex-row">
        <Sidebar></Sidebar>
        <main>{children}</main>
      </div>
      <footer className="p-4">
        © {new Date().getFullYear()}, Built with ❤ by
        {` `}
        <a href="https://deimos.app">Deimos</a>
      </footer>
    </div>
  );
};

export default Layout;
