const mongoose=require('mongoose')
const createschema=new mongoose.Schema(
    {
        EnterName:
        {
            type:String,
            required:true
        },
        MobileNo:
        {
            type:String,
            required:true,
            unique:true
        },
        otpverification:
        {
            type:Number,
            required:true
        },
        Emailid:
        {
            type:String,
            required:true
        },
        Enterpassword:
        {
            type:String,
            required:true
        },
        ReEnterpassword:
        {
            type:String,
            required:true
        }
     }
)
module.exports= mongoose.model("createentry",createschema)