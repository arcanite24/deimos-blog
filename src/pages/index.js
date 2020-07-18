import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import PropTypes from 'prop-types';
import PostItem from '../components/posts/PostItem';
import find from 'lodash/find';

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.posts.edges;
  const authors = data.authors.edges.map(
    a => a.node.childMarkdownRemark.frontmatter
  );

  console.log(posts);

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <p>{JSON.stringify(posts)}</p>
      <p>{JSON.stringify(data.site)}</p>
      <ul>
        {posts.map(
          ({
            node: {
              frontmatter: { title, date, author: postAuthor },
              fields: { slug },
            },
          }) => (
            <PostItem
              title={title}
              key={slug}
              author={find(authors, author => author.twitter === postAuthor)}
            ></PostItem>
          )
        )}
      </ul>
    </Layout>
  );
};

BlogIndex.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.object,
    posts: PropTypes.object,
    authors: PropTypes.object,
  }),
  location: PropTypes.object,
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    authors: allFile(filter: { sourceInstanceName: { eq: "authors" } }) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              name
              avatar
              twitter
            }
          }
        }
      }
    }
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/_posts/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            thumbnail
            description
            date(formatString: "MMMM DD, YYYY")
            author
          }
        }
      }
    }
  }
`;
