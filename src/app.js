const express = require('express')
const { Server: HTTPServer } = require('http')
const { Server: IOServer } = require('socket.io')
const { socket } = require('./socket.js')
const { session } = require('./config/session.js')
const passport = require('passport')
const path = require('path')
const routerSession = require('./routes/session.routes.js')
const routerRandoms = require('./routes/random.routes.js')
const routerInfo = require('./routes/info.routes.js')

/*+++++++++++++++++++++++++
+ CONFIGURACION DE LA APP +
++++++++++++++++++++++++++*/

// Inicializacion
const app = express()
const http = new HTTPServer(app)
const io = new IOServer(http)
socket(io)

// Configuracion
const PORT = process.env.PORT || 8080
app.set('port', PORT)
app.set('views', path.join(__dirname, 'views'))

// Configuracion de template
app.set('view engine', '.ejs')

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session)
app.use(passport.initialize())
app.use(passport.session())

// Static file
app.use(express.static(path.join(__dirname, 'public')))

// Rutas
app.use('/api', routerSession)
app.use('/api', routerRandoms)
app.use('/info', routerInfo)
app.use((req, res) => {
    res.status(404).render('errorRuta')
})

module.exports = { app, http }