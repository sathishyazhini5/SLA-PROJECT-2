const streamSchema = require('../../model/streamschema')

//save
const streamsave = async(data)=>
{
    try{
        const newstream = new streamSchema(data)
        const savestream = await newstream.save()
        return savestream

    }catch(error)
    {
        return false
    }
    
}


module.exports=
{
    streamsave
}