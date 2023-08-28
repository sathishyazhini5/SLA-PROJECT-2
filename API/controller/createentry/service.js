const create=require('../../module/createentryschema')
const createsave=async(data)=>
{
    const MobileNo=await create.aggregate([{$match:{MobileNo:data.MobileNo}}])
    if(MobileNo.length==0)
    {
        const details=new create(data)
        const save=await details.save()
        return save
    } 
    else
    {
      return false
    }
}
const get=async(data)=>
{
    const alldata=await create.find()
    return alldata
}
module.exports=
{
    createsave,
    get
}
