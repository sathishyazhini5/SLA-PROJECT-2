const mongoose = require('mongoose')

const studenttaskschema = new mongoose.Schema({
    Student_ID:String,
    Student_Name:String,
    Branch:String,
    Stream:String,
    Batch:String,
    Tasks:String
})

module.exports=mongoose.model('studenttasks', studenttaskschema , 'studenttasks')

//postman input
/**
    Student_ID:"String",
    Student_Name:"String",
    Branch:"",
    Stream:"",
    Batch:"",
    Tasks:""


 */