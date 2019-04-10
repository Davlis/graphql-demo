const dotenv = require('dotenv')
const path = require('path')

{
  const envPath = path.resolve(process.cwd(), '../.env')
  dotenv.config({ path: envPath })
}

