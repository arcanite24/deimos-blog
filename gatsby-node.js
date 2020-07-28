const path = require('path');
const fs = require('fs');
const { createFilePath } = require('gatsby-source-filesystem');
const lunr = require('lunr');
require('lunr-languages/lunr.stemmer.support')(lunr);
require('lunr-languages/lunr.es')(lunr);

const writeFile = (path, payload) => {
  fs.writeFileSync(path, payload);
};

const LUNR_INDEX_PATH = path.resolve(__dirname, 'static', 'idx.json');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve('./src/templates/blog-post.js');
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
          filter: { frontmatter: { layout: { eq: "blog" } } }
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
                layout
                author
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  const posts = result.data.allMarkdownRemark.edges;

  const idx = lunr(function () {
    const _this = this;
    _this.field('title');
    _this.field('excerpt');
    _this.field('author');

    posts.forEach((post, index) => {
      const previous =
        index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;

      _this.add({
        id: post.node.id,
        title: post.node.frontmatter.title,
        excerpt: post.node.excerpt,
        author: post.node.frontmatter.author,
      });

      console.log(post.node.frontmatter.author);

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          author: post.node.frontmatter.author,
          previous,
          next,
        },
      });
    });
  });

  const idxPayload = JSON.stringify(idx.toJSON());
  writeFile(LUNR_INDEX_PATH, idxPayload);
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};
