import { buildApp } from './app.js'
import { config } from './utils/config.js'

async function start() {
  try {
    const app = await buildApp()

    await app.listen({
      port: config.port,
      host: '0.0.0.0',
    })

    console.log(`🚀 Server running at http://localhost:${config.port}`)
    console.log(`📊 Health check: http://localhost:${config.port}/health`)
    console.log(`⚾ API endpoint: http://localhost:${config.port}/api/players`)
    console.log(`📚 Swagger docs: http://localhost:${config.port}/docs`)
    console.log(`🌍 Environment: ${config.nodeEnv}`)
  } catch (error) {
    console.error('Error starting server:', error)
    process.exit(1)
  }
}

start()
