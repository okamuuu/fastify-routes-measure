'use strict'

const fp = require('fastify-plugin')
const PerformanceMeasure = require('performance-measure')

const m = new PerformanceMeasure()

module.exports = fp(async function (fastify, opts) {
  fastify.addHook('preHandler', function (request, reply, next) {
    m.start(request.raw.id)
    next()
  })

  fastify.addHook('onSend', function (request, reply, _, next) {
    const routeId = reply.context.config.statsId ? reply.context.config.statsId : request.raw.url
    m.endAs(request.raw.id, routeId)
    next()
  })

  fastify.decorate('measure', m)
})
