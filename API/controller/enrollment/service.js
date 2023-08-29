const enrollSchema = require('../../model/enrollmentschema')
const feeModel = require('../../model/feeschema')
const promoModel = require('../../model/promocodeschema')

//save enroll
const enrollsave = async(data)=>
{
    try{

        const exis = await enrollSchema.findOne({MobileNo:data.MobileNo})
        if(exis)
        {
            return false
        }
        else
        {
            const count = await enrollSchema.countDocuments()

            data.Student_ID = 'SLA'+ data.Batch  +  data.Stream +  (count+1)

            if(data.Stream=='FS')
            {
                data.Course_fee=20000
            }
            if(data.Stream=='BD')
            {
                data.Course_fee=15000
            }

            const findpromo = data.Promo_Code
            const promo = await promoModel.findOne({PromoName:findpromo})
                if(!promo)
                {
                    return false
                }
                else
                {
                    /**const getdisc = await promoModel.find({PromoName:data.Promo_Code},'Discount_fee')
                    
                    data.Discount_fee = getdisc.Discount_fee
                    //data.Discount_fee = 10000 */
                    data.Discount_fee = promo.Discount_fee;
                    
                }


            const newenroll = new enrollSchema(data)
            const saveenroll = await newenroll.save()
            return saveenroll
        }

    }catch(error)
    {
        return false
    }
}


//getallenrollments
const getenroll = async(data)=>
{
    try{

        const en = await enrollSchema.find()
        return en
        
    }catch(error)
    {
        return false
    }
}

//getby student_id
const combinedata = async(data)=>
{
    try
    {
        const enrollsid = await enrollSchema.findOne({Student_ID:data.Student_ID})

        const feesid = await feeModel.findOne({Student_ID:data.Student_ID})

        if(enrollsid&&feesid)
        {
            const cb = {
                Student_ID: enrollsid.Student_ID,
                Student_Name: enrollsid.Student_Name,
                Batch: enrollsid.Batch,
                Branch: enrollsid.Branch,
                Stream: enrollsid.Stream,
                Batch_Start_Date: enrollsid.Batch_Start_Date,
                Batch_Timing: enrollsid.Batch_Timing,
                Course_fee: enrollsid.Course_fee,
                Promo_Code: enrollsid.Promo_Code,
                Discount_fee: enrollsid.Discount_fee,
                Paid_Amount: feesid.Paid_Amount,
                Pending_Amount: feesid.Pending_Amount
            }

            return cb
        }

    }catch(error)
    {
        return false
    }
}

//update all enrollment details by student_id
const updatestudentenroll = async(data)=>
{
    try{

        const upt = await enrollSchema.findOneAndUpdate({MobileNo:data.MobileNo},{$set:{Student_ID:data.Student_ID,Batch:data.Branch,Branch:data.Branch,Stream:data.Stream,Batch_start_Date:data.Batch_Start_Date,Batch_Timing:data.Batch_Timing,Course_fee:data.Course_fee,Promo_Code:data.Promo_Code,Discount_fee:data.Discount_fee}})
        return upt

    }catch(error)
    {
        return false
    }
}

module.exports=
{
    enrollsave,
    getenroll,
    combinedata,
    updatestudentenroll
}