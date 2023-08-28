const mongoose = require('mongoose')

const enquirySchema = new mongoose.Schema({
    Student_Name:{
        type:string
    },
    MobileNo:{
        type:string
    },
    Email:{
        type:string
    },
    College:{
        type:String
    },
    Qualification:{
        type:string
    },
    Year_Of_Passed:{
        type:string
    },
    Stream_enquiry:{
        type:string
    },
    Mode:{
        type:string
    },
    Referred_By:{
        type:string
    },
    location:{
        type:string
    }
})

module.exports= mongoose.model('enquiry', enquirySchema ,'enquiry')