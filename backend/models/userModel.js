const mongoose = require('mongoose')
const validator = require('validator')
const generic = require('./generic/generiqueModel')
const UserSchema = mongoose.Schema({

    cin: { 
        type: String,
        //required: true,
        unique:true
    },
    nom: {
        type: String,
        validate:value=>{
            if (!value.match(/^[a-zA-Z\s]*$/)) {
                throw new Error('Invalid  Nom' )
            }
        }
    }, 
    prenom: {
        
        type: String,
        validate:value=>{
            if (!value.match(/^[a-zA-Z\s]*$/)) {
                throw new Error('Invalid  Prenom' )
            }
        }
    },
    email: {
        type: String, 
        trim: true, 
        index: true,
        unique: true,
        sparse: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({ error: 'Invalid Email address' })
            }
        }
    },
    tel: {
        type: String,
        minLength: 8,
        maxLength: 8
    },
    telValid: {
        type: Boolean, default: false
    },
    login: {
        type: String,
        //minLength: 7
    },
    password: {
        type: String

        //minLength: 7
    },
    gender: {
        type: String, enum: ["Homme", "Femme"],
        // required: true,

    },
    dateNaissance: { 
        type: Date 
    },   
    create_date: {
        type: Date,
        default: Date.now
    },
    update_date: {
        type: Date
    },
    banned:{
        type: Boolean,
        default: true
    },
    role: {
         type: String, 
         enum: ["Admin", "ResponsableEtablissement", "Recruteur","TitulaireDiplome","Banned"],
         default: "TitulaireDiplome" 
        },
    })


    generic.dateUpdateDateCreated(UserSchema)
    
    UserSchema.pre('findOneAndUpdate', function (next) {
     
        if (!this._update.nom.match(/^[a-zA-Z\s]*$/)) {
            return new Promise(async (resolve, reject) => {
                reject(new Error('Nom Invalid'))
            })
        }
    
        if (!this._update.prenom.match(/^[a-zA-Z\s]*$/)) {
            return new Promise(async (resolve, reject) => {
                reject(new Error('Prenom Invalid'))
            })
    
        }
        next()
    });
    
    module.exports = mongoose.model('user', UserSchema);
    

