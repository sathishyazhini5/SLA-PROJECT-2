const service = require('./service')
const bcrypt = require('bcrypt')

//lg
const lg = async (req, res) => {
    try {
        const mob = req.body.MobileNo;
        const user = await service.login(mob);

        if (!user) {
            res.send({
                code: 400,
                status: false,
                message: 'MobileNo not found',
            });
            return;
        }

        const hashedPassword = user.Enter_Password;
        const passwordMatch = await bcrypt.compare(req.body.Enter_Password, hashedPassword);

        if (passwordMatch) {
            res.send({
                code: 200,
                status: true,
                message: 'Login Successful',
            });
        } else {
            res.send({
                code: 400,
                status: false,
                message: 'Incorrect Password',
            });
        }
    } catch (error) {
        console.error(error);
        res.send({
            code: 500,
            status: false,
            message: 'Internal server error',
        });
    }
};


//login2
const login2=async(req,res)=>
{
    let MobileNo=req.body.MobileNo
    const match=await service.login2(MobileNo)
    if(match.length==0)
    {
        res.send("Mobile already exist")
               
    }
    else
    {
        const password=match[0].Enter_Password

        const pwmatch=await bcrypt.compare(req.body.Enter_Password,password)
        if(pwmatch)
        {
            res.send
            (
                {
                    code:200,
                    msg:"login success"
                }
            )
        }
        else
        {
        res.send
        ( 
           {
            code:200,
            msg:"password incorrect"
           }
        )
        }
    }
}


//lg3
const lg3 = async(req,res)=>
{
    try{
    
    const mob = req.body.MobileNo
    const match = await service.login2(mob)
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
    lg,
    login2,
    lg3
}