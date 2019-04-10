const request = require("request-promise-native");

class JokesService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  async getJoke() {
    const options = {
      method: 'GET',
      url: `${this.baseUrl}/`,
      headers: { 'Accept': 'application/json' },
      json: true 
    };

    const response = await request(options)

    return response
  }
}

module.exports = JokesService
