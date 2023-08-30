const PlacementModel = require('../../model/placementschema')
const enrollmodel = require('../../model/enrollmentschema')

//saveplace
const saveplace = async(data)=>
{
    try{

        const exis = await PlacementModel.findOne({Student_Name:data.Student_Name})
        if(exis)
        {
            return false
        }
        else
        {
            const match = await enrollmodel.findOne({Student_Name:data.Student_Name})

            data.Batch = match.Batch
            data.Stream = match.Stream

            const newplace = new PlacementModel(data)
            const saveplace = await newplace.save()
            return saveplace
        }

    }catch(error)
    {
        return false
    }
}

module.exports=
{
    saveplace
}