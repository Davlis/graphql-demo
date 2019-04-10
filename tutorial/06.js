/**
 * https://graphql.github.io/graphql-js/mutations-and-input-types/
 * 
 * 
 * CREATE
    curl -X POST \
    http://localhost:4000/graphql \
    -H 'Content-Type: application/json' \
    -H 'Postman-Token: 4299901b-d706-44bf-997e-1d780bc38d80' \
    -H 'cache-control: no-cache' \
    -d '{
        "query": "mutation CreateMessage($input: MessageInput) { createMessage(input: $input) { id } }",
        "variables": {
            "input": {
                "author": "Dawid",
                "content": "Hello World!"
            }
        }
    }'
 *
 * GET
    curl -X POST \
    http://localhost:4000/graphql \
    -H 'Content-Type: application/json' \
    -H 'Postman-Token: d6b2f73e-9b88-4848-bd37-a78125a00aac' \
    -H 'cache-control: no-cache' \
    -d '{
        "query": "query GetMessage($id: ID!) { getMessage(id: $id) { content } }",
        "variables": {
            "id": "6c17a25c86d9dc660e8e"
        }
    }'
 * UPDATE
    curl -X POST \
    http://localhost:4000/graphql \
    -H 'Content-Type: application/json' \
    -H 'Postman-Token: bedb9274-47a4-4259-bf4c-0ffa724a8721' \
    -H 'cache-control: no-cache' \
    -d '{
        "query": "mutation UpdateMessage($id: ID!, $input: MessageInput) { updateMessage(id: $id, input: $input) { id content } }",
        "variables": {
            "id": "84490f247a4986ec66bb",
            "input": {
                "author": "Dawid",
                "content": "Hello W000rlz!"
            }
        }
    }'
 */

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  input MessageInput {
    content: String
    author: String
  }

  type Message {
    id: ID!
    content: String
    author: String
  }

  type Query {
    getMessage(id: ID!): Message
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`);

// If Message had any complex fields, we'd put them on this object.
class Message {
  constructor(id, {content, author}) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}

// Maps username to content
var fakeDatabase = {};

var root = {
  getMessage: function ({id}) {
    if (!fakeDatabase[id]) {
      throw new Error('no message exists with id ' + id);
    }
    return new Message(id, fakeDatabase[id]);
  },
  createMessage: function ({input}) {
    // Create a random id for our "database".
    var id = require('crypto').randomBytes(10).toString('hex');

    fakeDatabase[id] = input;
    return new Message(id, input);
  },
  updateMessage: function ({id, input}) {
    if (!fakeDatabase[id]) {
      throw new Error('no message exists with id ' + id);
    }
    // This replaces all old data, but some apps might want partial update.
    fakeDatabase[id] = input;
    return new Message(id, input);
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});
