const service = require('./service')

//savestrm
const savestrm = async(req,res)=>
{
    try{

        const ss = await service.stream2save(req.body)
        if(ss)
        {
            res.send({
                code:200,
                status:true,
                message:'stream2 Saved successfully',
                Response:ss
            })
        }
        else
        {
            res.send({
                code:400,
                status:false,
                message:'aldready Stream exist'
            })
        }

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
    savestrm
}