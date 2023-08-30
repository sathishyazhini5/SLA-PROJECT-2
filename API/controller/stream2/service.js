const stream2Schema = require('../../model/stream2schema')

//savestream
const stream2save = async(data)=>
{
    try{
        const exis = await stream2Schema.findOne({StreamName:data.StreamName})
        if(exis)
        {
            return false
        }
        else
        {
            const newstream = new stream2Schema(data)
            const savestram = await newstream.save()
            return savestram
        }

    }catch(error)
    {
        return false
    }
}

module.exports=
{
    stream2save
}