const fastify = require('fastify')()
const fastifyVite = require('fastify-vite')
const fastifyViteVue = require('fastify-vite-vue')

async function main () {
  await fastify.register(fastifyVite, {
    root: __dirname,
    renderer: fastifyViteVue,
    generate: {
      // paths: ['/posts/1', '/posts/2'],
      paths (add) {
        add('/')
        add('/posts/1')
        add('/posts/2')
        add('/posts/3')
      }
    }
  })
  await fastify.vite.ready()
  return fastify
}

if (require.main === module) {
  main().then((fastify) => {
    fastify.listen(3000, (err, address) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`Server listening on ${address}`)
    })
  })
}

module.exports = main
