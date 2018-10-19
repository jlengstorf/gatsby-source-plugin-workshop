const createNodeHelpers = require('gatsby-node-helpers').default;
const people = require('./data/people.json');
const cocktails = require('./data/cocktails.json');

const { createNodeFactory } = createNodeHelpers({
  typePrefix: 'Relationships'
});

const PersonNode = createNodeFactory('Person');
const CocktailNode = createNodeFactory('Cocktail');

exports.sourceNodes = ({ actions: { createNode } }) => {
  const cocktailNodes = cocktails.map(cocktailData =>
    CocktailNode(cocktailData)
  );

  people.forEach(personData => {
    const person = PersonNode(personData);

    person.cocktails___NODE = person.cocktails.map(
      cocktailID =>
        cocktailNodes.find(node => node.relationshipsId === cocktailID).id
    );

    cocktailNodes.forEach(node => {
      if (person.cocktails.includes(node.relationshipsId)) {
        const currentIDs = node.peopleWhoLikeThis___NODE || [];
        node.peopleWhoLikeThis___NODE = [...currentIDs, person.id];
      }
    });

    createNode(person);
  });

  cocktailNodes.forEach(node => {
    createNode(node);
  });
};
