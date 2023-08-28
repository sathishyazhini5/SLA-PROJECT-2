const { response } = require('express')
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

//getenroll.
const getallenroll = async(req,res)=>
{
    const gt = await service.getenroll()
    res.send({
        code:200,
        status:true,
        message:'all enrollments',
        response:gt
    })
}

module.exports=
{
    enrollsave,
    getallenroll
}