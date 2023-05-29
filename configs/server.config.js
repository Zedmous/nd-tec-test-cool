const express = require('express')
const cors = require('cors')
const fileUpload= require('express-fileupload');
const { dbConnection } = require('./database.config');
class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT | 3500

        this.pre = "/api";
        this.paths = {
            auth:this.pre+'/auth',
            users: this.pre + '/users',
            destinations: this.pre + '/destinations'
        };
        this.connectDB()
        this.middlewares()
        this.routes()
        this.listen()
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.paths.auth,require('../routes/auth.route'));
        this.app.use(this.paths.users,require('../routes/user.route'));
        this.app.use(this.paths.destinations,require('../routes/destination.route'));
    }

    async connectDB() {
        //console.log(`There is no connection to the DB`)
        await dbConnection()
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en localhost:${this.port}`)
        })
    }
}
module.exports = {
    Server
}