const mongoose = require('mongoose')

const stream2schema = new mongoose.Schema({
    Stream:{
       
        Stream_Name:String,
        Topics_Covered:String,
        Stream_duration:String

    },
    StreamName:String,
    Stream_fee:String
})

module.exports = mongoose.model('stream2',stream2schema,'stream2')