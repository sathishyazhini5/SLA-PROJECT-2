const mongoose = require('mongoose')

const signinSchema = new mongoose.Schema({
    Mobileno:{
        type:Number
    },
    Enter_Password:{
        type:String
    }
})

module.exports= mongoose.model('signin',signinSchema,'signin')