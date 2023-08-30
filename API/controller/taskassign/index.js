const service = require('./service')

//tasksave
const savetask = async(req,res)=>
{
    try{

        const save = await service.assigntask(req.body)
        res.send({
            code:200,
            status:true,
            message:'Task Assigned Successfully'
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
    savetask
}