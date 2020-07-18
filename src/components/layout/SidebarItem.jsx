import React from 'react';
import classnames from 'classnames';
import './SidebarItem.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { navigate, Link } from 'gatsby';
import PropTypes from 'prop-types';

const SidebarItem = ({
  children,
  active = false,
  icon,
  slug,
  items = [],
  location,
}) => {
  return (
    <div className="flex flex-col">
      <div
        onClick={() => navigate(slug)}
        className={classnames('sidebar-item', {
          'sidebar-item--active': active,
        })}
      >
        {icon && <FontAwesomeIcon icon={icon}></FontAwesomeIcon>}
        <span>{children}</span>
      </div>
      {items && items.length > 0 && (
        <ul style={{ marginLeft: '3rem' }}>
          {items.map(({ frontmatter: { title }, fields: { slug } }) => (
            <li
              key={slug}
              className={classnames({
                'c-primary': location.pathname === slug,
              })}
            >
              <Link to={slug}>{title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

SidebarItem.propTypes = {
  children: PropTypes.string,
  active: PropTypes.bool,
  icon: PropTypes.string,
  slug: PropTypes.string,
  items: PropTypes.array,
};

export default SidebarItem;
