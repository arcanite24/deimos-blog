import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import './PostItem.scss';
import UiService from '../../services/ui.service';

const PostItem = ({ title, excerpt, slug, children, author, date }) => {
  return (
    <div className="post-item flex flex-col" onClick={() => navigate(slug)}>
      <h2>{title}</h2>
      <p>{excerpt}</p>
      {children}
      <div className="post-item__author flex flex-row align-center">
        <strong style={{ alignSelf: 'flex-end' }}>{date}</strong>
        <div className="flex flex-row ml-auto align-center">
          <div className="flex flex-col">
            <h4>{author.name}</h4>
            <small>{author.twitter}</small>
          </div>
          <img
            src={UiService.formatStaticUrl(author.avatar)}
            alt={`${author.name} avatar`}
          />
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  title: PropTypes.string,
  excerpt: PropTypes.string,
  slug: PropTypes.string,
  children: PropTypes.element,
  date: PropTypes.string,
  author: PropTypes.shape({
    name: PropTypes.string,
    twitter: PropTypes.string,
    avatar: PropTypes.string,
  }),
};

export default PostItem;
