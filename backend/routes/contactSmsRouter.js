const express = require('express')
const router = express.Router()
const  service = require('../service/contactSmsService')
const genereiqueRouter = require('../routes/generic/genericRouter')

class contactSmsRouter extends genereiqueRouter {
  constructor(router,service) {
    super(router,service);
  }
}

new contactSmsRouter(router,service)


module.exports = router 