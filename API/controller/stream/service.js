const streamSchema = require('../../model/streamschema')

//save
const streamsave = async(data)=>
{
    try{

        if(data.StreamName=='FS')
        {
            data.Stream_fee=20000
        }
        if(data.StreamName=='BD')
        {
            data.Stream_fee=15000
        }
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