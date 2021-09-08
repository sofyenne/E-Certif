const express = require('express');
const DiplomeModel = require('../models/diplomeModel');
const EtablissementModel = require('../models/etablissementModel');
const userModel = require('../models/userModel');
const router = express.Router()
const service = require('../service/diplomeCrudService')

const genereiqueRouter = require('./generic/genericRouter')
class diplomeRouter extends genereiqueRouter {
  constructor(router, service) {
    super(router, service);
  }

}

router.post('/WithPopulate', async (req, res) => {

  if (req.body) {

    /**************************ADmin *************/

    if (req.body.role == 'Recruteur') {

      try {
        const docs = await service.afficheAllWithPopulateUserAndEtablissement()
        res.json(docs)
      } catch (err) {
        res.status(201).json({ message: err.message })
      }
    }

    /******************** Recruteur**************/

    /****************Patient */

    if (req.body.role == 'TitulaireDiplome') {

      try {
        const docs = await service.afficheAllForUser(req.body._id)
        res.json(docs)
      } catch (err) {
        res.status(201).json({ message: err.message })
      }
    }


    /********************************* */


       /***************************ResponsableEtablissement*****************/
       if (req.body.role == 'ResponsableEtablissement') {

      
        try {
          const etab = await service.afficheEtablissemtByUser(req.body._id)
          const docs = await service.afficheForEtablissement(etab._id)
          res.json(docs)
        } catch (err) {
          res.status(201).json({ message: err.message })
        }
      }

       /************************************************** */

  }

})
 // Creating one 
 router.post('/create', async (req, res) => {
   if(req.body.user){
    const users = await userModel.findById(req.body.user)
     const diplomebyuser = await service.afficheAllForUser(req.body.user)
    
    let listTitre = []
    
    for(let item of diplomebyuser){
      listTitre.push(item.titre)
    }
    
     if(listTitre.includes(req.body.titre)){
       res.status(201).json(('un titulaire ne peuve pas obtenir le  même diplome a la fois'))
     }else{
      try {
        let attrib = {
          numCin : users.cin ,
          titulaire : users.nom 
        }
       
       let diplome = Object.assign(attrib , req.body)
        console.log(diplome)
        await service.ajout(diplome)
        res.status(201).json(true)
      } catch (err) {
        res.status(201).json({ message: err.message })
      }
     }
   }
 
})

 // Patch one update
 router.patch('/update/:id', async (req, res) => {
  const filter = { _id: req.body._id };
  if(req.body.user){
    const diplomebyuser = await service.afficheAllForUser(req.body.user)
    const diplomeByEtablissemnt = await service.afficheForEtablissement(req.body.etablissement)
   let listTitre = []
   let etabExixt = false
   for(let item of diplomebyuser){
     listTitre.push(item.titre)
   }
   for(let item of diplomeByEtablissemnt){
     if(req.body.etablissement == item.etablissement) etabExixt = true
   }
    if(listTitre.includes(req.body.titre)&&etabExixt) {
      res.status(201).json(('un titulaire ne peuve pas obtenir le  même diplome a la fois'))
    }else{
  try {
     await service.findOneAndUpdateOrCreate(filter, req.body)
    res.json(true)
  } catch (err) {
    res.status(201).json({ message: err.message })
  }
}}
})

new diplomeRouter(router, service)

module.exports = router