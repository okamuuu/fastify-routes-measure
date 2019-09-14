'use strict'

const { test } = require('tap')
const Fastify = require('fastify')
const FastifyRoutesMeasure = require('.')

test('produces some stats', async (t) => {
  const fastify = Fastify()
  fastify.register(FastifyRoutesMeasure)

  t.tearDown(fastify.close.bind(fastify))

  fastify.get('/', async () => {
    return { hello: 'world' }
  })

  await fastify.inject({
    url: '/'
  })

  const measurements = fastify.measure.measurements()
  const nums = measurements['/']
  t.ok(nums[0] >= 0)
  t.ok(nums.length === 1)
})
