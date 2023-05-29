const { request, response } = require('express');
const {  findAllUser, findUserById, createdUser, updatedUser, deletedUser } = require('../services');

const getUsers = async (req = request, res = response) => {
    const { limit = 15, from = 0, notPaginate = false } = req.query;
    const { message, users, status, total } = await findAllUser(limit, from, notPaginate)
    if(notPaginate){
        return res.status(status).json({
            message,
            total,
            users
        })
        
    }else{
        return res.status(status).json({
            message,
            from,
            limit,
            notPaginate,
            total,
            users
        })
    }
}

const getUserById = async (req = request, res = response) => {
    const {id}=req.params;
    console.log("en el controlador")
    const {user,message,status}=await findUserById(id)
    return res.status(status).json({
        message,
        user
    })
}


const postUser = async (req = request, res = response) => {
    const { status, message, user } = await createdUser(req.body)
    return res.status(status).json({
        message,
        user
    });
}
const putUser = async (req = request, res = response) => {
    const {id}=req.params;
    const { status, message, user } = await updatedUser(id,req.body)
    return res.status(status).json({
        message,
        user
    });
}
const deleteUser = async (req = request, res = response) => {
    const {id}=req.params;
    const { status, message, user } = await deletedUser(id)
    return res.status(status).json({
        message,
        user
    });
}


module.exports = {
    getUsers,
    getUserById,
    postUser,
    putUser,
    deleteUser
}