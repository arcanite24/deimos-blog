import React from 'react';
import './Sidebar.scss';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  return (
    <aside className="sidebar flex flex-col align-center">
      <SidebarItem icon="coffee" active={true}>
        Home
      </SidebarItem>
      <SidebarItem icon="check-square">Test</SidebarItem>
    </aside>
  );
};

export default Sidebar;
