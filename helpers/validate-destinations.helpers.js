const { DestinationModel } = require('../models')



const existDestinationById = async (id = '') => {
    const destination = await DestinationModel.findById({ _id: id })
    if (!destination) {
        throw new Error(`The destination by id:  ${id} , no exist`)
    }
}
const existNameDestination = async (name = '') => {
    const destination = await DestinationModel.findOne({ name })
    if (destination) {
        throw new Error(`Name:  ${name} , in use by another destination`)
    }
}

module.exports = {
    existDestinationById,
    existNameDestination
}