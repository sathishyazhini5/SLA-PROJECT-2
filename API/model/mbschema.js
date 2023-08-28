const mongoose = require('mongoose')

const managebranchSchema = new mongoose.Schema({
    BranchName:{
        type:string
    }
})

module.exports= mongoose.model('branch', managebranchSchema , 'branch')