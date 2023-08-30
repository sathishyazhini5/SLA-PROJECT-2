const studenttaskModel = require('../../model/studenttasks')
const enrollModel = require('../../model/enrollmentschema')
const taskModel = require('../../model/taskassignschema')

//savestudenttasks
const savestudenttasks = async(data)=>
{
    const findstudent = await enrollModel.findOne({Student_ID:data.Student_ID,Student_Name:data.Student_Name})
    if(!findstudent)
    {
        throw new Error("No student")
    }
    else
    {
        data.Branch = findstudent.Branch
        data.Stream = findstudent.Stream
        data.Batch = findstudent.Batch

        //const batch = data.Batch
        const task = await taskModel.findOne({To_Batch:data.Batch})
        if(task)
        {
            data.Tasks = task.Task_Description
        }
        else
        {
            return false
        }

        const newstutask = new studenttaskModel(data)
        const savestutask = await newstutask.save()
        return savestutask

    }
}

module.exports=
{
    savestudenttasks
}