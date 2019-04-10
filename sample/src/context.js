const JokeService = require('./common/services/JokesService')

const context = {
  jokeService: new JokeService(process.env.JOKES_SERVICE_URL)
}

module.exports = context;
