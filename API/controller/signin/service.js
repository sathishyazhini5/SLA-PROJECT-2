const task=require('../../module/createentryschema')
const logindata=async(data)=>
{
    const login=await task.aggregate([{$match:{MobileNo:data}}])
    return login
}
module.exports=
{
    logindata
}