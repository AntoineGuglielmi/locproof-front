const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const fs = require('fs')
const path = require('path')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

// 👉 LOG FILE CENTRAL
const logFile = path.join(__dirname, 'debug.log')

function log(...args) {
  const line = `[${new Date().toISOString()}] ${args.join(' ')}\n`
  fs.appendFileSync(logFile, line)
  process.stdout.write(line)
}

process.on('uncaughtException', (err) => {
  log('UNCAUGHT_EXCEPTION', err.stack || err.message)
})

process.on('unhandledRejection', (err) => {
  log('UNHANDLED_REJECTION', err)
})

console.log = (...args) => log(...args)
console.error = (...args) => log('ERROR:', ...args)

app.prepare().then(() => {
  log('NEXT APP STARTING')

  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl

      log('REQUEST', pathname)

      if (pathname === '/a') {
        await app.render(req, res, '/a', query)
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query)
      } else {
        await handle(req, res, parsedUrl)
      }
    } catch (err) {
      log('REQUEST_ERROR', req.url, err.stack || err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) {
      log('LISTEN_ERROR', err)
      throw err
    }

    log(`READY ON http://${hostname}:${port}`)
  })
})
