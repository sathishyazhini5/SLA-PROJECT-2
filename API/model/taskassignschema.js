const mongoose = require('mongoose')

const taskassignschema = new mongoose.Schema({
   
    To_Stream:String,
    To_Batch:String,
    Task_Description:String

})

module.exports= mongoose.model('taskassign',taskassignschema,'taskassign')


//postman input
/*
    To_Stream:"String",
    To_Batch:"String",
    Task_Description:"String"
*/