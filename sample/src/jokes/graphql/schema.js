const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Joke {
    content: String
  }

  type Query {
    getJoke: Joke
  }
`);

module.exports = schema
