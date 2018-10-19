const createNodeHelpers = require('gatsby-node-helpers').default;
const postData = require('./data/posts.json');
const commentData = require('./data/comments.json');

const { createNodeFactory, generateNodeId } = createNodeHelpers({
  typePrefix: 'Blog'
});

const PostNode = createNodeFactory('Post', post => {
  const postComments = commentData.filter(
    comment => comment.postID === post.blogId
  );

  post.children = postComments.map(comment =>
    generateNodeId('Comment', comment.id)
  );

  return post;
});

const CommentNode = createNodeFactory('Comment');

exports.sourceNodes = ({ actions: { createNode } }) => {
  postData.forEach(post => {
    const postNode = PostNode(post);

    commentData.forEach(comment => {
      const commentNode = CommentNode(comment, {
        parent: postNode.id
      });

      createNode(commentNode);
    });

    createNode(postNode);
  });
};
