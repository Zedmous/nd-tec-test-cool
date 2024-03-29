const mongoose = require('mongoose')
const dbConnection = async () => {
    try {
        await mongoose.connect( process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database online")
    } catch (error) {
        console.log(error)
        throw new Error('Error starting database');
    }
}
module.exports = {
    dbConnection
}