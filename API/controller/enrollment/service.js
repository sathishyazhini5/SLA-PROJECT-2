const enrollSchema = require('../../model/enrollmentschema')
const feeModel = require('../../model/feeschema')
const promoModel = require('../../model/promocodeschema')
const streamModel = require('../../model/streamschema')


//saveenrollment-updated requirements
const registerstudent = async(data)=>
{
    try{

        const exis = await enrollSchema.findOne({MobileNo:data.MobileNo})
        if(exis)
        {
            return false
        }
        else
        {
            const stream = await streamModel.findOne({StreamName:data.Stream})
            if(!stream)
            {
                throw new Error("Stream Not Found")
            }

            const coursefee = stream.Stream_fee

            const promo = await promoModel.findOne({PromoName:data.Promo_Code})
            if(promo)
            {
                const currentDate = new Date();
                const promoEndDate = new Date(promo.Enddate);

                if (promoEndDate >= currentDate)
                {
                    
                    const coursefee = stream.Stream_fee
                    const discount_percentage = parseInt(promo.Discount)
                    const discount_fee = (discount_percentage/100) * coursefee 
                    const coursefee_afterdiscount = coursefee - discount_fee

                    data.Original_Course_fee = coursefee
                    data.Course_fee = coursefee_afterdiscount
                    data.Discount_fee = discount_fee.toFixed(2);
                    
                }
                else
                {
                    data.Original_Course_fee = coursefee
                    data.Course_fee = coursefee
                    data.Discount_fee = "0.00"
                }
            }
            else
            {
                data.Original_Course_fee = coursefee
                data.Course_fee = coursefee
                data.Discount_fee = "0.00"
            }
                
            

            const count = await enrollSchema.countDocuments()
            data.Student_ID = 'SLA' + data.Batch + data.Stream + (count+1)

            const newstudent = new enrollSchema(data)
            const savestudent = await newstudent.save()
            return savestudent
            
        
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
    registerstudent,
    getenroll,
    combinedata,
    updatestudentenroll,

}