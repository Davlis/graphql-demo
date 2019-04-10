const registry = require('../../common/lib/registry')

async function getJoke() {
  const { jokeService } = registry.get('context')

  return jokeService.getJoke()
}

module.exports = getJoke
