const getJokeProcessor = require('../processors/getJoke')

const resolver = {
  getJoke: async (_args, ...rest) => {
    const joke = await getJokeProcessor(rest)
    return { content: joke.joke }
  }
}

module.exports = resolver
