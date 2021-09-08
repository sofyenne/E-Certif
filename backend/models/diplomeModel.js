var mongoose = require('mongoose');
const generic = require('./generic/generiqueModel')
var DiplomeSchema = mongoose.Schema({
   

    titre:{
        type: String
    },
 
 numCin : {
     type : String
 } , 
 titulaire :  {
    type : String
} ,
  
    dateObtunation:{
        type: Date
    },

user:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },
etablissement:{ type: mongoose.Schema.Types.ObjectId, ref: 'etablissement' },

})

generic.dateUpdateDateCreated(DiplomeSchema)

const DiplomeModel= mongoose.model('diplome', DiplomeSchema);
module.exports = DiplomeModel