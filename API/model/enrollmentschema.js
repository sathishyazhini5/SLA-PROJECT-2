const mongoose = require('mongoose')

const enrollmentSchema = new mongoose.Schema({
    Student_Name:{
        type:string
    },
    Batch:{
        type:string
    },
    Branch:{
        type:string
    },
    Stream:{
        type:string
    },
    Batch_start_Date:{
        type:string
    },
    Batch_Timing:{
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
    }
})