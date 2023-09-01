const { response } = require('express')
const service = require('./service')

//saveffe
const savefee = async (req, res) => 
{
    try {

        const feedata = req.body;
        const savedfee = await service.fee(feedata);
    
        if (savedfee) 
        {
            res.status(201).json(savedfee);
        } 
        else 
        {         
            res.status(400).json({ message: 'Not a Student' });
        }

    } catch (error)
    {
        res.status(500).json({ message: 'Internal server error.' });
    }
  
}


//getfee
const getfee = async(req,res)=>
{
    try{

        const fee = await service.allfee()
        res.send({
            code:200,
            status:true,
            message:'All fee fetched',
            response:fee
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

//updatefee
const updatefee = async(req,res)=>
{
    try{

        const upt = await service.updatependingamount(req.body)
        res.send({
            code:200,
            status:true,
            message:'Fee Updated Successfully',
            response:upt
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

//saveffee
const savefee2 = async (req, res) => 
{
    try {

        const feedata = req.body;
        const savedfee = await service.fee2(feedata);
    
        if (savedfee) 
        {
            res.status(201).json(savedfee);
        } 
        else 
        {         
            res.status(400).json({ message: 'Not a Student' });
        }

    } catch (error)
    {
        res.status(500).json({ message: 'Internal server error.' });
    }
  
}

//updatefee
const updatefee2 = async(req,res)=>
{
    try{

        const upt = await service.updatependingamount2(req.body)
        res.send({
            code:200,
            status:true,
            message:'Fee Updated Successfully',
            response:upt
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
    savefee,
    getfee,
    updatefee,
    savefee2,
    updatefee2
}