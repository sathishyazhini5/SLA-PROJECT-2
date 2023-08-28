const userdata = require('../../model/regschema')

//login
const login = async (data) => {
    const user = await userdata.aggregate([{$match:{MobileNo:data}}]);
    return user;
};
module.exports=
{
    login
    
}