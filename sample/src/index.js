require('./config')

const createServer = require('./server')
const context = require('./context')

const registry = require('./common/lib/registry')
registry.set('context', context)

const config = {}
const server = createServer(config, context)

server.listen(process.env.PORT, () => {
  console.log(`Running a API server at localhost:${process.env.PORT}`);
});
