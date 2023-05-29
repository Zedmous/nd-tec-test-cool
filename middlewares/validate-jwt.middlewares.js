const { response, request } = require('express')
const jwt=require('jsonwebtoken');
const User = require('../models/user.model');
const validateJWT=async (req=request,res=response,next)=>{
    const token=req.header('x-token');
    if(!token){
        return res.status(401).json({
            msj:'There is no token in the request'
        })
    }
    try {
        const {uid}=jwt.verify(token,process.env.SECRET_KEY);
        const authUser=await User.findById({_id:uid})
        req.authUser=authUser;
        if(!authUser){
            return res.status(401).json({
                msj:'User does not exist'
            })
        }
        if(!authUser.status){
            return res.status(401).json({
                msj:'The user is disabled'
            })
        }
        next();
    } catch (error) {
        console.log('Invalid token')
        return res.status(401).json({
            msj:'Invalid token'
        })
    }
}
module.exports={
    validateJWT
}