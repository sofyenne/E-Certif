const userModel = require('../models/userModel')
const genereiqueService = require('../service/generic/genereiqueService')


class model extends genereiqueService {
  constructor(x) {
    super(x);
  }

  afficheAll() {
    return userModel.find().populate('organisme').exec()
  }
}
module.exports = new model(userModel)








