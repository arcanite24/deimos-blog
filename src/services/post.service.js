import { graphql } from 'gatsby';

const PostService = {
  getAllPosts: () => graphql`
    query GetAllPosts {
      allFile(filter: { sourceInstanceName: { eq: "posts" } }) {
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
    }
  `,
};

export default PostService;
