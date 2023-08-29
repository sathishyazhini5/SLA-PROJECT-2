const { response } = require('express')
const service = require('./service')
const enrollSchema = require('../../model/enrollmentschema')


//save-enroll
const enrollsave = async(req,res)=>
{
    try{

        const en = await service.enrollsave(req.body)
        if(en)
        {
            res.send({
                code:200,
                status:true,
                message:'Enrollement saved successfully',
                response:en
            })
    
        }
        else
        {
            res.send({
                code:400,
                status:false,
                message:'MobileNumber Already exist'
            })
        }
        
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


//combine data
const combinedata  = async(req,res)=>
{
    try{

        const id = req.body.Student_ID
        const details = await service.combinedata({Student_ID:id})
        if(details)
        {
            res.send({
                code:200,
                status:true,
                message:'student Details',
                response: details
            })
        }
        else
        {
            res.send({
                code:400,
                status:false,
                message:'student details NOT found'
            })
        }

    }catch(error)
    {
        res.send({
            code:400,
            status:false,
            message:'Something went wrong'
        })
    }
}

//updatestudent
const upt = async(req,res)=>
{
    try{

        const count = await enrollSchema.countDocuments()
        req.body.Student_ID = 'SLA' + req.body.Batch + req.body.Stream + (count+1)
       


        const update = await service.updatestudentenroll(req.body)
        res.send({
            code:200,
            status:true,
            message:'Updated successfully',
            response:update
        })

    }catch(error)
    {
        res.send({
            code:400,
            status:false,
            message:'Something went wrong!!!'
        })
    }
}

module.exports=
{
    enrollsave,
    getallenroll,
    combinedata,
    upt
}