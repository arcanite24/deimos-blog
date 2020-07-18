import React from 'react';
import PropTypes from 'prop-types';

import './PostItem.scss';

const PostItem = ({ title, excerpt, slug, children, author }) => {
  return (
    <div className="post-item flex flex-col">
      <h2>{title}</h2>
      <p>{excerpt}</p>
      {children}
      <div className="post-item__author flex flex-col">
        <div className="flex flex-col">
          <h4>{author.name}</h4>
          <small>{author.twitter}</small>
        </div>
        <img src={author.avatar} alt={`${author.name} avatar`} />
      </div>
    </div>
  );
};

PostItem.propTypes = {
  title: PropTypes.string,
  excerpt: PropTypes.string,
  slug: PropTypes.string,
  children: PropTypes.element,
  author: PropTypes.shape({
    name: PropTypes.string,
    twitter: PropTypes.string,
    avatar: PropTypes.string,
  }),
};

export default PostItem;
