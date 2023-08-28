const enrollSchema = require('../../model/enrollmentschema')

//save enroll
const enrollsave = async(data)=>
{
    try{

        const count = await enrollSchema.countDocuments()

        data.Student_ID = 'SLA'+ data.Batch  +  data.Stream +  (count+1)

        const newenroll = new enrollSchema(data)
        const saveenroll = await newenroll.save()
        return saveenroll

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


module.exports=
{
    enrollsave,
    getenroll
}