const { Router } = require('express')
const { infoController } = require('../controllers/info.controller.js')

const routerInfo = Router()

// Randoms
routerInfo.get('/', infoController)

module.exports = routerInfo