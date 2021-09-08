const express = require('express')
const router = express.Router()
const service = require('../service/userCrudService')

const genereiqueRouter = require('../routes/generic/genericRouter')
class userRouter extends genereiqueRouter {
  constructor(router, service) {
    super(router, service);
  }
}

new userRouter(router, service)

module.exports = router