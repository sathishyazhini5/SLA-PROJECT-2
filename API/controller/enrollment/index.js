const { response } = require('express')
const service = require('./service')
const enrollSchema = require('../../model/enrollmentschema')


//reg
const reg = async(req,res)=>
{
    try{

        const enrolldata = req.body
        const reg = await service.registerstudent(enrolldata)
        if(reg)
        {
            res.send({
                code:200,
                status:true,
                message:'Registered successfully',
                response: reg
            })
        }
        else
        {
            res.send({
                code:400,
                status:false,
                message:'MobileNo aldready exist'
            })
        }

    }catch(error)
    {
        res.send({
            code:400,
            status:false,
            message:'Something went wrong!!!'
        })
    }
}

//reg
const saveStudents = async (req, res) => {
    try {
      const enrollmentData = req.body;
      const savedEnrollment = await service.registerstudent(enrollmentData);
  
      if (savedEnrollment) {
        res.status(201).json(savedEnrollment);
      } else {
        
        res.status(400).json({ message: 'Mobile number already exists.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  };

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
    reg,
    saveStudents,
    getallenroll,
    combinedata,
    upt
    
}