import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { shape, object } from 'prop-types';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';

import './blog-post.scss';

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const author = data.author.frontmatter;
  const post = data.post;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article className="container mx-auto blog-post">
        <header>
          <small>
            {post.frontmatter.category} | {post.frontmatter.date}
          </small>
          <h1>{post.frontmatter.title}</h1>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: '1rem',
          }}
        />
        <footer>
          <Bio author={author} />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

BlogPostTemplate.propTypes = {
  data: shape({
    site: object,
    post: object,
    author: object,
  }),
  pageContext: shape({
    previous: object,
    next: object,
  }),
  location: object,
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String, $author: String) {
    site {
      siteMetadata {
        title
      }
    }
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        category
        author
      }
    }
    author: markdownRemark(frontmatter: { twitter: { eq: $author } }) {
      frontmatter {
        name
        twitter
        avatar
        bio
      }
    }
  }
`;
