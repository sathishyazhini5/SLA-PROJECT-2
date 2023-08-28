const service = require('./service')
const bcrypt = require('bcrypt')

//lg
const lg2 = async(req,res)=>

    
{
    try{
    
    const mob = req.body.MobileNo
    const match = await service.login(mob)
    if(match.length==0)
    {
        res.send({
            code:400,
            status:false,
            message:'MobileNo not found'
        })
    }
    else
    {
        const password = match[0].Enter_Password
        const hashedpassword = await bcrypt.compare(req.body.Enter_Password,password)
        console.log(hashedpassword)
        if(hashedpassword)
        {
            res.send({
                code:200,
                staus:true,
                message:'Login Successful'
            })
        }
        else
        {
            res.send({
                code:400,
                status:false,
                message:'Incorrect Password'
            })
        }
        
    }

    }catch(error)
    {
        return false
    }

}

module.exports=
{
    lg2
}