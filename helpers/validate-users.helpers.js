const {UserModel} = require('../models')


const existUserById=async(id='')=>{
    const user=await UserModel.findById({_id:id})
    if(!user){
        throw new Error(`The user by id:  ${id} , no exist`)
    }
}
const existUserByEmail=async(email='')=>{
    const existMail=await UserModel.findOne({email})
    if(existMail){
        throw new Error(`Email:  ${email} , in use by another user`)
    }
}

module.exports={
    existUserByEmail,
    existUserById
}