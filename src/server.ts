import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

app.get('/hello', async () => {
  const test = await knex('sqlite_schema').select('*')

  return test
})

app
  .listen({
    port: 3333, // porta
  })
  .then(() => {
    console.log('HTTP Server Running') // deu certo da esse clg
  })