import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as lunr from 'lunr';
import { useDebounce } from 'use-debounce';

import indexCache from '../../../static/idx.json';
import './GlobalSearch.scss';
import { useEffect } from 'react';
import classnames from 'classnames';
import useKeyPress from '../../hooks/useKeyPress';
import { navigate } from 'gatsby';
import { KeyEnum } from '../../enums/keys.enum';

const idx = lunr.Index.load(indexCache);

const DEBOUNCE_DELAY = 300;
const MIN_SEARCH_LENGTH = 2;

const search = query => {
  return idx.search(query);
};

const GlobalSearch = ({ placeholder = 'Search something', posts }) => {
  const [query, setQuery] = useState('');
  const [value] = useDebounce(query, DEBOUNCE_DELAY);
  const [results, setResults] = useState(null);
  const [selected, setSelected] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const upPressed = useKeyPress([KeyEnum.ArrowUp]);
  const downPressed = useKeyPress([KeyEnum.ArrowDown]);
  const enterPressed = useKeyPress([KeyEnum.Enter]);

  const setIndex = (newSelected, newIndex) => {
    setSelected(newSelected);
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    let newIndex = currentIndex;

    if (upPressed) {
      newIndex = currentIndex > 0 ? currentIndex - 1 : results.length - 1;
      setIndex(results[newIndex].ref, newIndex);
    }

    if (downPressed) {
      newIndex = currentIndex < results.length - 1 ? currentIndex + 1 : 0;
      setIndex(results[newIndex].ref, newIndex);
    }

    if (enterPressed) {
      const actualPost = results[currentIndex];
      if (actualPost && actualPost.slug) {
        navigate(actualPost.slug);
      }
    }
  }, [upPressed, downPressed, enterPressed]);

  useEffect(() => {
    if (value && value.length >= MIN_SEARCH_LENGTH) {
      const foundPosts = search(value);
      setResults([
        ...foundPosts.map(post => ({
          ...posts[post.ref],
          ref: post.ref,
        })),
      ]);
      setSelected(foundPosts[0]?.ref);
      setCurrentIndex(0);
    } else {
      setResults(null);
    }
  }, [value]);

  return (
    <div className="global-search">
      <input
        type="text"
        placeholder={placeholder}
        onChange={e => setQuery(e.target.value)}
      />
      {results && results.length > 0 && (
        <ul className="global-search__results flex flex-col">
          {results.map(post => (
            <li
              onClick={() => navigate(post.slug)}
              key={post.slug}
              className={classnames(
                {
                  'c-primary': selected === post.ref,
                },
                'flex flex-col w-100'
              )}
            >
              {post.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

GlobalSearch.propTypes = {
  placeholder: PropTypes.string,
  posts: PropTypes.object,
};

export default GlobalSearch;
