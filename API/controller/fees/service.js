const feeSchema = require('../../model/feeschema')
const enrollstudents = require('../../model/enrollmentschema')
const streamModel = require('../../model/streamschema')
const promoModel = require('../../model/promocodeschema')

const streamModel2 = require('../../model/stream2schema')

//savefee
const fee = async(data)=>
{
    try{

        const s_id_in_enroll =  data.Student_ID
        const s_name_in_enroll = data.Student_Name
        const s_stream = data.Stream

        const enrollidmatch = await enrollstudents.findOne( { Student_ID: s_id_in_enroll,Student_Name:s_name_in_enroll,Stream:s_stream } )
        if(!enrollidmatch)
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
                    const discount = parseInt(promo.Discount)
                    const discountedfee = (discount/100)  *  coursefee;
                    const discountedcoursefee = coursefee-discountedfee

                    data.Original_Course_fee = coursefee;
                    data.Discount_fee = discountedfee.toFixed(2)
                    data.Course_fee = discountedcoursefee;  
                    
                    const paidamount = data.Paid_Amount
                    const pendingamount = discountedcoursefee - paidamount
                    data.Pending_Amount = pendingamount  
                }
                else
                {
                    data.Original_Course_fee = coursefee;
                    data.Discount_fee = "0.00"
                    data.Course_fee = coursefee; 
                    const paidamount = data.Paid_Amount
                    const pendingamount = coursefee - paidamount
                    data.Pending_Amount = pendingamount
                }
                    
            }
            else
            {
                data.Original_Course_fee = coursefee;
                data.Discount_fee = "0.00"
                data.Course_fee = coursefee; 
            }

            /**const paidamount = data.Paid_Amount
            const balanceamount = coursefee - paidamount
            data.Pending_Amount = balanceamount */

            data.Start_Date = enrollidmatch.Batch_start_Date
            data.Timing = enrollidmatch.Batch_Timing

            data.Batch = enrollidmatch.Batch
            data.Stream = enrollidmatch.Stream

            const newfee = new feeSchema(data)
            const savefee = await newfee.save()
            return savefee

        }
    

        
    }catch(error)
    {
        return false
    }
}


//savefee with stream2 Model
const fee2 = async(data)=>
{
    try{

        const s_id_in_enroll =  data.Student_ID
        const s_name_in_enroll = data.Student_Name
        const s_stream = data.Stream

        const enrollidmatch = await enrollstudents.findOne( { Student_ID: s_id_in_enroll,Student_Name:s_name_in_enroll,Stream:s_stream } )
        if(!enrollidmatch)
        {
            return false
        }
        
        else
        {

            const stream = await streamModel2.findOne({StreamName:data.Stream})
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
                    const discount = parseInt(promo.Discount)
                    const discountedfee = (discount/100)  *  coursefee;
                    const discountedcoursefee = coursefee-discountedfee

                    data.Original_Course_fee = coursefee;
                    data.Discount_fee = discountedfee.toFixed(2)
                    data.Course_fee = discountedcoursefee;  
                    
                    const paidamount = data.Paid_Amount
                    const pendingamount = discountedcoursefee - paidamount
                    data.Pending_Amount = pendingamount  
                }
                else
                {
                    data.Original_Course_fee = coursefee;
                    data.Discount_fee = "0.00"
                    data.Course_fee = coursefee; 
                    const paidamount = data.Paid_Amount
                    const pendingamount = coursefee - paidamount
                    data.Pending_Amount = pendingamount
                }
                    
            }
            else
            {
                data.Original_Course_fee = coursefee;
                data.Discount_fee = "0.00"
                data.Course_fee = coursefee; 
            }

            /**const paidamount = data.Paid_Amount
            const balanceamount = coursefee - paidamount
            data.Pending_Amount = balanceamount */

            data.Start_Date = enrollidmatch.Batch_start_Date
            data.Timing = enrollidmatch.Batch_Timing

            data.Batch = enrollidmatch.Batch
            data.Stream = enrollidmatch.Stream

            const newfee = new feeSchema(data)
            const savefee = await newfee.save()
            return savefee

        }
    

        
    }catch(error)
    {
        return false
    }
}


//allfee
const allfee = async(data)=>
{
    try{
        const fee = await feeSchema.find()
        return fee
    }catch(error)
    {
        return false
    }
}

//update pending amount
const updatependingamount = async(data)=>
{
    try{

        const matchfee = await feeSchema.findOne({Student_ID:data.Student_ID})
        
        if(!matchfee)
        {
            throw new Error("Student Not Found")
        }

        const amounttopay = matchfee.Pending_Amount

        const nowpaidamount = data.Paid_Amount

        const pending = amounttopay - nowpaidamount
        
        const upt = await feeSchema.updateOne({Student_ID:data.Student_ID},{$set:{Paid_Amount:data.Paid_Amount,Pending_Amount:pending}})
        
        return upt
    

    }catch(error)
    {
        return false
    }
}

//updatepending amount with stu_id,name,stream matching
//output--> response false ... amount not updated but output will show fee updated only msg
const updatependingamount2 = async(data)=>
{
    try{

        const matchfee = await feeSchema.findOne({Student_ID:data.Student_ID,Stream:data.Stream,Batch:data.Batch})
        
        if(!matchfee)
        {
            throw new Error("Student Not Found")
        }

        const amounttopay = matchfee.Pending_Amount

        const nowpaidamount = data.Paid_Amount

        const pending = amounttopay - nowpaidamount
        
        const upt = await feeSchema.updateOne({Student_ID:data.Student_ID},{$set:{Paid_Amount:data.Paid_Amount,Pending_Amount:pending}})
        
        return upt
    

    }catch(error)
    {
        return false
    }
}






module.exports=
{
    fee,
    allfee,
    updatependingamount,
    fee2,
    updatependingamount2
}