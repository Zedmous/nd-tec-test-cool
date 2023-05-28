const { request, response } = require('express');
const { createUser, login } = require('../services');

const logIn = async (req = request, res = response) => {
    const {email, password}=req.body
    
    try {
        const {status,message,user,token}= await login(email,password)
        return res.status(status).json({
            message,
            user,
            token
        });
    } catch ({message,status}) {
        return res.status(status).json({
            message
        });
    } 
    
    
}

const registerUser=async (req = request, res = response)=>{
    

    const user= await createUser(req.body)
    return res.json({
        message:"register",
        user
    });
}


const renewToken = (req = request, res = response) => {
    return res.json({
        message:"renew token"
    });
}

module.exports = {
    logIn,
    renewToken,
    registerUser
}