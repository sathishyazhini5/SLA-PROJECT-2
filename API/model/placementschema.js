const mongoose = require('mongoose')

const placementschema = new mongoose.Schema({
    Student_Name:String,
    Got_Placed_In:String,
    Package:String,
    Batch:String,
    Stream:String
})


module.exports = mongoose.model('placement' , placementschema , 'placement')