const service = require('./service')

//save-enroll
const enrollsave = async(req,res)=>
{
    try{

        const en = await service.enrollsave(req.body)
        res.send({
            code:200,
            status:true,
            message:'Enrollement saved successfully',
            response:en
        })

    }catch(error)
    {
        res.send({
            code:400,
            status: false,
            message:'Something went wrong!!!'
        })
    }
}

module.exports=
{
    enrollsave
}