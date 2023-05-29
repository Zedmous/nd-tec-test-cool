const {User} = require('../models')
const { findUserById } = require('../services')


const existUserById=async(id='')=>{
    const user=await User.findById({_id:id})
    if(!user){
        throw new Error(`The user by id:  ${id} , no exist`)
    }
}
const emailExist=async(email='')=>{
    const existMail=await User.findOne({email})
    if(existMail){
        throw new Error(`Email:  ${email} , in use by another user`)
    }
}

module.exports={
    emailExist,
    existUserById
}