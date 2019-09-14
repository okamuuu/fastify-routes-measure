const fastify = require('fastify')({
  logger: false
})

fastify.register(require('.'))

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

fastify.get('/', (request, reply) => {
  sleep(100)
  reply.send({ GET: '/' })
})

fastify.get('/items', (request, reply) => {
  sleep(100)
  reply.send({ GET: 'items/' })
})

fastify.get('/items/:id', { config: { statsId: '/items/:id' } }, (request, reply) => {
  sleep(100)
  const id = request.params.id
  reply.send({ GET: `/items/${id}` })
})

fastify.get('/__stats__', async (req, reply) => {
  const style = "font-family: 'Fira Mono', 'Andale Mono', 'Consolas', 'monospace';"
  reply
    .header('Content-Type', 'Content-type: text/html; charset=utf-8')
    .send(`<pre style="${style}">${fastify.measure.print()}</pre>`)
})

fastify.listen(4000, (err, address) => {
  if (err) throw err
  console.log(`server listening on ${address}`)
})
