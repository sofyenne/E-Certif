const contactSmsModel = require('../models/contactSmsModel')
const genereiqueService = require('../service/generic/genereiqueService')
class model extends genereiqueService {
  constructor(x) {
    super(x);
  }
}
module.exports = new model(contactSmsModel)








