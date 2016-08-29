
const fs = require('fs')
const path = require('path')
const http = require('http')
const url = require('url')
const querystring = require('querystring')
const hello = require('./hello')
const bikeshed = require('./bikeshed')
const view = require('./view')
const hexToRgb = require('./hexToRgb')

const bundle = fs.readFileSync(path.join(__dirname, 'public/bundle.js'), 'utf8')

const handleRequest = (req, res) => {
  if (/bundle.js/.test(req.url)) {
    res.end(bundle)
    return
  }

  const { query } = url.parse(req.url, true)

  const base = query.c ? hexToRgb(query.c) : bikeshed()
  const color = hello(base)

  res.end('<!DOCTYPE html>' + view({ color, base }))
}

const server = http.createServer(handleRequest)


server.listen(3000, () => {
  console.log('Listening on 3000')
})


