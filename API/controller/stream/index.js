const service = require('./service')

//save
const streamsave = async(req,res)=>
{
    try{

        const st = await service.streamsave(req.body)
        res.send({
            code:200,
            status:true,
            message:'Stream saved successfully',
            Response:st
        })

    }catch(error)
    {
        res.send({
            code:400,
            status:false,
            message:'something went wrong!!!'
        })
    }
}


module.exports=
{
    streamsave
}