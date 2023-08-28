const mongoose = require('mongoose')

const feeSchema = new mongoose.Schema({
    Student_Name:{
        type:string
    },
    Batch:{
        type:string
    },
    Stream:{
        type:string
    },
    Start_Date:{
        type:string
    },
    Timing:{
        type:string
    },
    Course_fee:{
        type:string
    },
    Promo_Code:{
        type:string
    },
    Discount_fee:{
        type:string
    },
    Paid_Amount:{
        type:Number
    },
    Pending_Amount:{
        type:Number
    }
})