const taskassignModel = require('../../model/taskassignschema')


//savetask
const assigntask = async(data)=>
{
    try{

        const newtask = new taskassignModel(data)
        const savetask = await newtask.save()
        return savetask

    }catch(error)
    {
        return false
    }
}

module.exports=
{
    assigntask
}