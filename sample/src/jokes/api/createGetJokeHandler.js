const getJokeProcessor = require('../processors/getJoke')

function createGetJokeHandler(context) {
  return async function handler(_req, res, _next) {
    const joke = await getJokeProcessor(context)
    res.send({ joke })
  }
}

module.exports = createGetJokeHandler
