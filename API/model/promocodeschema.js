const mongoose = require('mongoose')

const promocodeSchema = new mongoose.Schema({
    PromoName:{
        type:String
    },
    Stream:{
        type:String
    },
    Discount:{
        type:String
    },
    Startdate:{
        type:Date
    },
    Enddate:{
        type:String
    }
})