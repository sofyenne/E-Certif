const diplomeModel = require('../models/diplomeModel');
const EtablissementModel = require('../models/etablissementModel');
const genereiqueService = require('../service/generic/genereiqueService')


class model extends genereiqueService {
  constructor(x) {
    super(x);
  }

  async afficheAllWithPopulateUserAndEtablissement() {
  
    return     await diplomeModel.find().exec()
    
  }

  async afficheAllForUser(x) {
  
    return     await diplomeModel.find({user:x}).exec()
    
  }

  async afficheForEtablissement(x) {
  
    return     await diplomeModel.find({etablissement:x}).exec()
    
  }
  async afficheEtablissemtByUser(x){
    return await EtablissementModel.findOne({responsable : x}).exec()
  }

  
}


module.exports = new model(diplomeModel)



