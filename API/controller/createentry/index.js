const task=require('./service')
const bcrypt=require('bcrypt')
const savedata=async(req,res)=>
{
   const salt=await bcrypt.genSalt(10)
   const enpassword=await bcrypt.hash(req.body.Enterpassword,salt)
   req.body.Enterpassword=enpassword
   const reenpassword=await bcrypt.hash(req.body.ReEnterpassword,salt)
   req.body.ReEnterpassword=reenpassword
   const create=await task.createsave(req.body)
   if(create)
   {
    res.send
       ({code:200,
        message:"stored successfuly"})
       }
   else
   {
    res.send(
        {code:200,
        message:"unsuccess"}
    )
   }
}
const findall=async(req,res)=>
{
    const data=await task.get(req.body)
    res.send(data)
}
module.exports=
{
    savedata,
    findall
}