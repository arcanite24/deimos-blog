import React from 'react';
import './Sidebar.scss';
import SidebarItem from './SidebarItem';
import { useStaticQuery } from 'gatsby';
import CategoryService from '../../services/category.service';
import groupBy from 'lodash/groupBy';

const Sidebar = () => {
  const data = useStaticQuery(CategoryService.getAllCategories('category'));
  const categories = data.allFile.edges;

  console.log(categories);

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
