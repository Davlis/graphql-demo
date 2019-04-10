const graphqlHTTP = require('express-graphql');

// FIXME
const root = require('./jokes/graphql/resolver')
const schema = require('./jokes/graphql/schema')

function createGraphQLApi() {
  return graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
}

module.exports = createGraphQLApi
