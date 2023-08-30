const service = require('./service')

//studenttasksave
const studenttasksave = async(req,res)=>
{
    try{

        const savetask = await service.savestudenttasks(req.body)
        if(savetask)
        {
            res.send({
                code:200,
                status:true,
                message:'Student Tasks',
                tasks:savetask
            })
        }
        else
        {
            res.send({
                code:400,
                status:false,
                message:'No tasks'
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
    studenttasksave
}