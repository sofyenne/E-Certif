const express = require('express')
const router = express.Router()
const service = require('../service/etablissementCrudService')

const genereiqueRouter = require('./generic/genericRouter')
class etablissementRouter extends genereiqueRouter {
  constructor(router, service) {
    super(router, service);
  }
}

new etablissementRouter(router, service)

module.exports = router