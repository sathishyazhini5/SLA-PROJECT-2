const feeSchema = require('../../model/feeschema')
const enrollstudents = require('../../model/enrollmentschema')

//savefee
const fee = async(data)=>
{
    try{

        const s_name_in_enroll =  data.Student_Name

        const enrollnamematch = await enrollstudents.findOne( { Student_Name: s_name_in_enroll } )
        if(!enrollnamematch)
        {
            return false
        }
        else
        {

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