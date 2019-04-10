/**
curl -X POST \
  http://localhost:4000/graphql \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 738ced1c-899d-4538-b7e1-cc6666b62fa2' \
  -H 'cache-control: no-cache' \
  -d '{
	"query": "query ip { ip }"
}
'
 */

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    ip: String
  }
`);

function loggingMiddleware(req, res, next) {
  console.log('ip:', req.ip);
  next();
}

var root = {
  ip: function (args, request) {
    return request.ip;
  }
};

var app = express();
app.use(loggingMiddleware);
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
