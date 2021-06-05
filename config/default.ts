const dev = {
  port: 9098,
  host: 'localhost',
  dbUri: 'mongodb+srv://RavB1998:RavB1998@portfolio-api.g3v5e.mongodb.net/portfolio_db?retryWrites=true&w=majority'
}

const production = {
  port: process.env.PORT,
  dbUri: 'mongodb+srv://RavB1998:RavB1998@portfolio-api.g3v5e.mongodb.net/portfolio_db?retryWrites=true&w=majority'
}

export default { dev, production };