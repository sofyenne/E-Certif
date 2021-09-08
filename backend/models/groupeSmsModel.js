const mongoose = require('mongoose')
const generic = require('./generic/generiqueModel')
const groupeSmsSchema = mongoose.Schema({

    name: {
    type: String,
    unique:true,
    required: true},
    
    description: {
    type: String
    // required: true
   ,
    contactSms: {
    type: [mongoose.Schema.Types.ObjectId], ref: 'contactSms' ,
    index: true,
    unique: true,
    sparse: true,
   }}
,
create_date: {
    type: Date,
    default: Date.now},

update_date: {
    type: Date
}
 
})

generic.dateUpdateDateCreated(groupeSmsSchema)
 const groupeSmsModel = mongoose.model('groupeSms',groupeSmsSchema);
 module.exports = groupeSmsModel