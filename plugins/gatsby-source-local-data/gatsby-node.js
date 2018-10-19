const createNodeHelpers = require('gatsby-node-helpers').default;
const localData = require('./data/people.json');

const { createNodeFactory } = createNodeHelpers({ typePrefix: 'Local' });

const PersonNode = createNodeFactory('Person');

exports.sourceNodes = ({ actions: { createNode } }) => {
  localData.forEach(data => {
    createNode(PersonNode(data));
  });
};
