const { Destination } = require("../models")




const findAllDestination = async (limit = 15, from = 0, notPaginate = false) => {
    const query = {
        status: true
    }
    try {
        if (notPaginate) {
            const destinations = await Destination.find(query)
            return {
                message: `Destinations founds`,
                status: 200,
                total: destinations.length,
                notPaginate,
                destinations
            }
        }
        const destinations = await Destination.find(query)
            .skip(Number(from))
            .limit(Number(limit))
        return {
            message: `Destinations founds`,
            status: 200,
            total: destinations.length,
            from,
            limit,
            notPaginate,
            destinations
        }
    } catch (error) {
        return {
            message: `Contact the administrator: error`,
            status: 500
        }
    }
}

const findDestinationById = async (id = "") => {
    try {
        const destination = await Destination.findById({_id:id})
        if (destination) {
            return {
                message: `Destination found`,
                destination,
                status: 200
            }
        }else{
            return {
                message: `Destination not found`,
                destination,
                status: 404
            }
        }
    } catch (error) {
        return {
            message: `Contact the administrator: error`,
            status: 500
        }
    }
}

const findDestinationByNameNotId = async (name = "",id="") => {
    try {
        const destination = await Destination.findOne({name,_id: { $ne: id }})
        if (destination) {
            return {
                message: `The name: ${name} is in use`,
                destination,
                status: 400
            }
        }else{
            return {
                message: `Desination not found`,
                destination,
                status: 404
            }
        }
    } catch (error) {
        return {
            message: `Contact the administrator: error`,
            destination:null,
            status: 500
        }
    }
}

const createdDestination = async (datainput) => {
    try {
        let {
            name,
            description,
            attactions,
            actiities,
            services,
            rating
        } = datainput;
        const datamodel = {
            name,
            description,
            attactions,
            actiities,
            services,
            rating
        }
        const destination = new Destination(datamodel)
        await destination.save()
        return {
            message: `Destination created`,
            status: 201,
            destination
        }
    } catch (error) {
        console.log(error)
        return {
            message: `Destination not created`,
            status: 500
        }
    }
}

const updatedDestination = async (id,datainput) => {
    try {
        let {
            name,
            description,
            attactions,
            actiities,
            services,
            rating
        } = datainput;
        const datamodel = {
            name,
            description,
            attactions,
            actiities,
            services,
            rating
        }
        const {destination}=findDestinationByNameNotId(name,id)
        if(destination){
            return {
                message: `Name:  ${name} , in use by another destination`,
                status: 400
            }
        }
        const destinationUp = await Destination.findByIdAndUpdate(id,datamodel,{new:true})
        await destinationUp.save()
        return {
            message: `Destination updated`,
            status: 201,
            destination:destinationUp
        }
    } catch (error) {
        console.log(error)
        return {
            message: `Destination not updated`,
            status: 500
        }
    }
}

const deletedDestination = async (id="") => {
    try {
        
        const datamodel = {
            status:false
        }
        const destination = await Destination.findByIdAndUpdate(id,datamodel,{new:true})
        await destination.save()
        return {
            message: `Destination deleted`,
            status: 201,
            destination
        }
    } catch (error) {
        console.log(error)
        return {
            message: `Destination not deleted`,
            status: 500
        }
    }
}

module.exports={
    findAllDestination,
    findDestinationById,
    findDestinationByNameNotId,
    createdDestination,
    updatedDestination,
    deletedDestination

}