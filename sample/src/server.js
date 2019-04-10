const express = require('express')
const createGraphQLApi = require('./graphql')

function createServer(config, context) {
  const server = express();

  server.set('config', config)
  server.set('context', context)

  server.use('/graphql', createGraphQLApi())

  return server  
}

module.exports = createServer
