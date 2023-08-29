const mongoose = require('mongoose')

const streamSchema = new mongoose.Schema({
    StreamName:{
        type:String
    },
    Stream_fee:{
        type:String
    }
    
})

module.exports= mongoose.model('stream',streamSchema,'stream')