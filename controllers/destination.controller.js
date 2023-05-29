const {request,response}= require('express');
const { findAllDestination, findDestinationById, createdDestination, updatedDestination, deletedDestination } = require('../services');


const getDestinations = async (req = request, res = response) => {
    const { limit = 15, from = 0, notPaginate = false } = req.query;
    const { message, destinations, status, total } = await findAllDestination(limit, from, notPaginate)
    if(notPaginate){
        return res.status(status).json({
            message,
            total,
            destinations
        })
        
    }else{
        return res.status(status).json({
            message,
            from,
            limit,
            notPaginate,
            total,
            destinations
        })
    }
}

const getDestinationById = async (req = request, res = response) => {
    const {id}=req.params;
    const {destination,message,status}=await findDestinationById(id)
    return res.status(status).json({
        message,
        destination
    })
}


const postDestination = async (req = request, res = response) => {
    const { status, message, user } = await createdDestination(req.body)
    return res.status(status).json({
        message,
        user
    });
}
const putDestination = async (req = request, res = response) => {
    const {id}=req.params;
    const { status, message, destination } = await updatedDestination(id,req.body)
    return res.status(status).json({
        message,
        destination
    });
}
const deleteDestination = async (req = request, res = response) => {
    const {id}=req.params;
    const { status, message, destination } = await deletedDestination(id)
    return res.status(status).json({
        message,
        destination
    });
}


module.exports = {
    getDestinations,
    getDestinationById,
    postDestination,
    putDestination,
    deleteDestination
}