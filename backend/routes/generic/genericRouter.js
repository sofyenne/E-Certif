const bcrypt = require("bcrypt");
const Cryptr = require('cryptr');
const mongoose = require('mongoose')
const cryptr = new Cryptr('myTotalySecretKey');
class genereiqueRouter {
  constructor(router, service) {
    this.router = router
    this.service = service

    //get all
    router.get('/', async (req, res) => {
      try {
        const docs = await service.afficheAll()
        res.json(docs)
      } catch (err) {
        res.status(201).json({ message: err.message })
      }
    })


//register
router.post('/register', async (req, res) => {
  try {
  
    let user = req.body
    user.password = cryptr.encrypt(user.password).toString()
    await service.ajout(req.body)
    res.status(201).json(true)
  } catch (err) {
    res.status(201).json({ message: err.message })
  }
})
    // Creating one 
    router.post('/', async (req, res) => {
      try {
        await service.ajout(req.body)
        res.status(201).json(true)
      } catch (err) {
        res.status(201).json({ message: err.message })
      }
    })
        // Creating one 
        router.post('/add', async (req, res) => {
          try {
            let responsable = mongoose.Types.ObjectId(req.body.responsable)
            req.body.responsable = responsable
            await service.ajout(req.body)
            res.status(201).json(true)
          } catch (err) {
            res.status(201).json({ message: err.message })
          }
        })

    // Patch one update
    router.patch('/:id', async (req, res) => {
      const filter = { _id: req.body._id };
      try {
         await service.findOneAndUpdateOrCreate(filter, req.body)
        res.json(true)
      } catch (err) {
        res.status(201).json({ message: err.message })
      }
     
    })


    //get one
    router.get('/:id', async (req, res) => {
      const doc = await service.findById(req.body._id)
      res.json(doc)
    })



    // Deleting one userModel
    router.delete('/:id', async (req, res) => {
      try {

        await service.findByIdAndDelete(req.params.id)
        res.json(true)
      } catch (err) {
        res.status(201).json({ message: err.message })
      }
    })




    // Delete many
    router.post('/deleteMany', async (req, res) => {
      let condition = []

      try {

        if (req.body) {
          req.body.forEach(element => {
            condition.push(element._id)
          });
        }
        await service.deleteMany({ _id: { $in: condition } })
        res.json(true)
      } catch (err) {
        res.status(201).json({ message: err.message })
      }
    })

  }



}


module.exports = genereiqueRouter