const {User} = require('../models')

const emailExist=async(email='')=>{
    const existMail=await User.findOne({email})
    if(existMail){
        throw new Error(`Email:  ${email} , in use by another user`)
    }
}

module.exports={
    emailExist
}