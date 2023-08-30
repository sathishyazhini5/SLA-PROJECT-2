const service = require('./service')

//saveplace
const saveplacement = async(req,res)=>
{
    try{

        const save = await service.saveplace(req.body)
        if(save)
        {
            res.send({
                code:200,
                sttaus:true,
                message:'Placement saved succesfully',
                response:save
            })
        }
        else
        {
            res.send({
                code:400,
                status:false,
                message:'Student Placement already exist'
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
    saveplacement
}