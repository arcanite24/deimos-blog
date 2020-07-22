import React from 'react';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import { useStaticQuery, graphql } from 'gatsby';

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;

  const data = useStaticQuery(graphql`
    query {
      posts: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/_posts/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            id
            excerpt(pruneLength: 500)
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
  `);

  return (
    <div className="w-100 flex flex-col">
      <Header
        posts={data.posts.edges
          .map(post => ({
            [post.node.id]: { ...post.node.fields, ...post.node.frontmatter },
          }))
          .reduce((acc, curr) => ({ ...acc, ...curr }), {})}
      ></Header>
      <div className="flex flex-row">
        <Sidebar location={location}></Sidebar>
        <main className="p-4 flex-1">{children}</main>
      </div>
      <footer className="p-4">
        © {new Date().getFullYear()}, Built with ❤ by
        {` `}
        <a href="https://deimos.app">Deimos</a>
      </footer>
    </div>
  );
};

export default Layout;
