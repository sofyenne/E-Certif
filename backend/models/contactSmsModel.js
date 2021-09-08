const mongoose = require('mongoose')
const generic = require('./generic/generiqueModel')
const contactSmsSchema = mongoose.Schema({
  prenom: {
        type: String,
        required: true,
         },
  nom: {
    type: String,
    required: true,
        },
  gsm: {
    type: String,
    required: true,
    unique:true
      },
  create_date: {
    type: Date,
      },
   update_date: {
    type: Date ,
    default: Date.now
}
 
})

generic.dateUpdateDateCreated(contactSmsSchema)

 const contactSmsModel = mongoose.model('contactSms',contactSmsSchema);
 module.exports = contactSmsModel