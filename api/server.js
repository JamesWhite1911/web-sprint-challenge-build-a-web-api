const express = require('express');

const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')

const server = express();
server.use(express.json())

function logger(req, res, next) {
    console.log(`
    Method: ${req.method}\n
    URL: ${req.url}\n
    `)
    next()
}

server.use(logger)
server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)


server.get('/', (req, res) => {
    res.send(`
    <h2>API up and running</h2>
    `)
})

module.exports = server;
