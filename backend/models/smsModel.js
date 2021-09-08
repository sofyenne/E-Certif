var mongoose = require('mongoose');
var smsSchema = mongoose.Schema({

    message: {
        type: String
      
    },
    tel:{
        type: String
    },
    etat:{
        type: Boolean, default:false
    },
    erreurDescription:{
        type: String , default:'en attente de confirmation' 
    }
   

});

var SMS = module.exports = mongoose.model('sms', smsSchema);