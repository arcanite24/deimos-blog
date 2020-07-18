import React from 'react';
import './Sidebar.scss';
import SidebarItem from './SidebarItem';
import { useStaticQuery, graphql } from 'gatsby';

const Sidebar = () => {
  const data = useStaticQuery(graphql`
    query {
      categories: allFile(
        filter: { sourceInstanceName: { eq: "categories" } }
      ) {
        edges {
          node {
            sourceInstanceName
            childMarkdownRemark {
              fields {
                slug
              }
              frontmatter {
                title
                icon
              }
            }
          }
        }
      }
      posts: allFile(filter: { sourceInstanceName: { eq: "posts" } }) {
        edges {
          node {
            sourceInstanceName
            childMarkdownRemark {
              fields {
                slug
              }
              frontmatter {
                title
                icon
              }
            }
          }
        }
      }
    }
  `);

  console.log(data);
  const posts = data.posts.edges;
  const categories = data.categories.edges;

  return (
    <aside className="sidebar flex flex-col align-center">
      <SidebarItem icon="coffee" active={true}>
        Home
      </SidebarItem>
      <SidebarItem icon="check-square">Test</SidebarItem>
    </aside>
  );
};

export default Sidebar;
