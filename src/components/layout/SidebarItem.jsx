import React from 'react';
import classnames from 'classnames';
import './SidebarItem.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SidebarItem = ({ children, active = false, icon }) => {
  return (
    <div
      className={classnames('sidebar-item', {
        'sidebar-item--active': active,
      })}
    >
      {icon && <FontAwesomeIcon icon={icon}></FontAwesomeIcon>}
      <span>{children}</span>
    </div>
  );
};

export default SidebarItem;
