import React from 'react';
import './Sidebar.scss';
import SidebarItem from './SidebarItem';
import { useStaticQuery, graphql } from 'gatsby';
import groupBy from 'lodash/groupBy';

// I'm leaving this here because there's a weird bug on Gatsby where he can't recognize the icon field on the frontmatter
const Icons = {
  '/cybersec/': 'lock',
};

const isActive = (slug, location) => location.pathname.includes(slug);

const Sidebar = ({ location }) => {
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
                category
              }
            }
          }
        }
      }
    }
  `);

  const posts = groupBy(
    data.posts.edges.map(p => p.node.childMarkdownRemark),
    post => post.frontmatter.category.replace(/\//g, '')
  );
  const categories = data.categories.edges.map(c => c.node.childMarkdownRemark);
  console.log(posts, categories);

  return (
    <aside className="sidebar flex flex-col">
      <SidebarItem
        icon="home"
        active={location.pathname === '/'}
        slug="/"
        location={location}
      >
        Home
      </SidebarItem>
      {categories.map(({ fields: { slug }, frontmatter: { title } }) => (
        <SidebarItem
          key={slug}
          icon={Icons[slug]}
          slug={slug}
          active={isActive(slug, location)}
          items={posts[slug.replace(/\//g, '')]}
          location={location}
        >
          {title}
        </SidebarItem>
      ))}
    </aside>
  );
};

export default Sidebar;
