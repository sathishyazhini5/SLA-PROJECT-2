const feeSchema = require('../../model/feeschema')
const enrollstudents = require('../../model/enrollmentschema')
const streamModel = require('../../model/streamschema')
const promoModel = require('../../model/promocodeschema')

//savefee
const fee = async(data)=>
{
    try{

        const s_id_in_enroll =  data.Student_ID

        const enrollidmatch = await enrollstudents.findOne( { Student_ID: s_id_in_enroll } )
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
                }
                else
                {
                    data.Original_Course_fee = coursefee;
                    data.Discount_fee = "0.00"
                    data.Course_fee = coursefee; 
                }
                    
            }
            else
            {
                data.Original_Course_fee = coursefee;
                data.Discount_fee = "0.00"
                data.Course_fee = coursefee; 
            }

            const paidamount = data.Paid_Amount
            const balanceamount = coursefee - paidamount
            data.Pending_Amount = balanceamount

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

module.exports=
{
    fee,
    allfee
}