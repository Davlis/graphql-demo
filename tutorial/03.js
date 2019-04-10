
/**
  curl -X POST \
    http://localhost:4000/graphql \
    -H 'Content-Type: application/json' \
    -H 'Postman-Token: 029a7a61-a144-490d-8a51-e97c8e2d9c5f' \
    -H 'cache-control: no-cache' \
    -d '{
    "query": "query RollDice($dice: Int!, $sides: Int) { rollDice(numDice: $dice, numSides: $sides) }",
    "variables": { "dice": 3, "sides": 6 }
  }'
 */

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },

  rollDice: function (args) {
    var output = [];
    for (var i = 0; i < args.numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (args.numSides || 6)));
    }
    return output;
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
