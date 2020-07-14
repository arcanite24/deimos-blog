import React from 'react';
import './HeaderAction.scss';
import classnames from 'classnames';

const HeaderAction = ({ text, active = false }) => {
  return (
    <div
      className={classnames(
        'header-action h-100 flex flex-col align-center justify-center',
        {
          'header-action--active': active,
        }
      )}
    >
      <span>{text}</span>
    </div>
  );
};

export default HeaderAction;
