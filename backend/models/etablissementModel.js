const mongoose = require('mongoose')
const generic = require('./generic/generiqueModel')
var uniqueValidator = require('mongoose-unique-validator');
const EtablissementSchema = mongoose.Schema({

  

    nomEtablissement: {
        type: String,
        required: true,
         },
    adr:{
            type: String
        },
    tel: {
            type: String,
            //required: true,
            unique: true,
            },
    fax: {
                type: String,
                //required: true,
                unique: true, 
                },
    email:{
        type: String, 
        trim: true, 
        index: true,
        unique: true,
        
        
        },
   
    responsable :{ type: mongoose.Schema.Types.ObjectId, ref: 'user' , unique: true, },

    create_date: {
        type: Date,
        default: Date.now
    },
    update_date: {
        type: Date,
        
     }
     
});

EtablissementSchema.plugin(uniqueValidator,{ message: 'Error, exeption {PATH} déja existe.' });
generic.dateUpdateDateCreated(EtablissementSchema)

 const EtablissementModel = mongoose.model('etablissement',EtablissementSchema);
 module.exports = EtablissementModel