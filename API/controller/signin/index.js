const sign=require('./service')
const bcrypt=require('bcrypt')
const login=async(req,res)=>
{
    let MobileNo=req.body.MobileNo
    const match=await sign.logindata(MobileNo)
    if(match.length==0)
    {
        res.send("Mobile already exist")
               
    }
    else
    {
        const pw=match[0].Enterpassword

        const pwmatch=await bcrypt.compare(req.body.Enterpassword,pw)
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
module.exports=
{
    login
}