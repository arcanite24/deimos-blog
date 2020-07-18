import React from 'react';
import PropTypes from 'prop-types';
import { navigate, useStaticQuery, graphql } from 'gatsby';

import './PostItem.scss';

const PostItem = ({ title, excerpt, slug, children, author, date }) => {
  const imageData = useStaticQuery(
    graphql(
      `
        query AvatarQuery {
          file(relativePath: { eq: $avatar }) {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `,
      { avatar: author.avatar }
    )
  );

  console.log(imageData);

  return (
    <div className="post-item flex flex-col" onClick={() => navigate(slug)}>
      <h2>{title}</h2>
      <p>{excerpt}</p>
      {children}
      <div className="post-item__author flex flex-row align-center">
        <strong>{date}</strong>
        <div className="flex flex-row ml-auto">
          <div className="flex flex-col">
            <h4>{author.name}</h4>
            <small>{author.twitter}</small>
            {author.avatar}
          </div>
          <img src={author.avatar} alt={`${author.name} avatar`} />
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
