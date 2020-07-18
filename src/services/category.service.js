import { graphql } from 'gatsby';

const CategoryService = {
  getAllCategories: () =>
    graphql`
      query GetAllCategories {
        allFile(filter: { sourceInstanceName: { eq: "categories" } }) {
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
    `,
};

export default CategoryService;
