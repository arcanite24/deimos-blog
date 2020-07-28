import React from 'react';
import PropTypes from 'prop-types';

import './Bio.scss';
import UiService from '../services/ui.service';

const Bio = ({ author }) => {
  return (
    <div className="bio flex flex-row align-center">
      <img src={UiService.formatStaticUrl(author.avatar)} alt={author.name} />
      <div className="flex flex-col">
        <p>
          Escrito por <strong>{author.name}</strong> |{' '}
          <a
            href={`https://twitter.com/${author.twitter}`}
            target="_blank"
            rel="noreferrer"
          >
            {author.twitter}
          </a>
        </p>
        <p>
          <small>{author.bio}</small>
        </p>
      </div>
    </div>
  );
};

Bio.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string,
    twitter: PropTypes.string,
    bio: PropTypes.string,
    avatar: PropTypes.string,
  }),
};

export default Bio;
