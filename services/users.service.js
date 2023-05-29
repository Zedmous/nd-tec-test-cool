const bcryptjs = require('bcryptjs');
const User = require('../models/user.model');
const { generateJWT } = require('../helpers');


const login = async (email = "", password = '') => {
    try {
        console.log(email, password)
        const {user} = await findUserByEmail(email)
        if (!user) {
            return {
                message: `The email user: ${email} does not exist.`,
                status: 400
            }
        } else if (!user.status) {
            return {
                message: `The user: ${email} is inactive.`,
                status: 400
            }
        } else {
            const passwordValid = await bcryptjs.compareSync(password, user.password)
            if (!passwordValid) {
                return {
                    message: `Email or password are wrong- wrong password`,
                    status: 400
                }
            } else {
                const token = await generateJWT(user.id);
                return {
                    message: `User logged in`,
                    status: 200,
                    user,
                    token
                }
            }
        }
    } catch (error) {
        console.log(error)
        return {
            message: `Contact the administrator`,
            status: 500
        }
    }
}

const findAllUser = async (limit = 15, from = 0, notPaginate = false) => {
    const query = {
        status: true
    }
    try {
        if (notPaginate) {
            const users = await User.find(query)
            return {
                message: `Users founds`,
                status: 200,
                total: users.length,
                notPaginate,
                users
            }
        }
        const users = await User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
        return {
            message: `Users founds`,
            status: 200,
            total: users.length,
            from,
            limit,
            notPaginate,
            users
        }
    } catch (error) {
        return {
            message: `Contact the administrator: error`,
            status: 500
        }
    }
}

const findUserById = async (id = "") => {
    try {
        const user = await User.findById({_id:id})
        if (user) {
            console.log("encontre")
            return {
                message: `User found`,
                user,
                status: 200
            }
        }else{
            return {
                message: `User not found`,
                user,
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
const findUserByEmail = async (email = "") => {
    try {
        const user = await User.findOne({ email })
        if (user) {
            return {
                message: `User found`,
                user,
                status: 200
            }
        }else{
            return {
                message: `User not found`,
                user,
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
const findUserByEmailNotId = async (email = "",id="") => {
    try {
        const user = await User.findOne({email,_id: { $ne: id }})
        if (user) {
            return {
                message: `The email: ${email} is in use`,
                user,
                status: 400
            }
        }else{
            return {
                message: `User not found`,
                user,
                status: 404
            }
        }
    } catch (error) {
        return {
            message: `Contact the administrator: error`,
            user:null,
            status: 500
        }
    }
}
const createdUser = async (datainput) => {
    try {
        let {
            firstname,
            lastname,
            email,
            password,
            img,
            role
        } = datainput;
        const salt = bcryptjs.genSaltSync();
        const datamodel = {
            firstname,
            lastname,
            email,
            password: bcryptjs.hashSync(passwor, salt),
            img,
            role
        }
        const user = new User(datamodel)
        await user.save()
        return {
            message: `User created`,
            status: 201,
            user
        }
    } catch (error) {
        console.log(error)
        return {
            message: `User not created`,
            status: 500
        }
    }
}

const updatedUser = async (id,datainput) => {
    try {
        let {
            firstname,
            lastname,
            email,
            img,
            role
        } = datainput;
        const datamodel = {
            firstname,
            lastname,
            email,
            img,
            role
        }
        const user = await User.findByIdAndUpdate(id,datamodel,{new:true})
        await user.save()
        return {
            message: `User updated`,
            status: 201,
            user
        }
    } catch (error) {
        console.log(error)
        return {
            message: `User not updated`,
            status: 500
        }
    }
}

const deletedUser = async (id="") => {
    try {
        
        const datamodel = {
            status:false
        }
        const user = await User.findByIdAndUpdate(id,datamodel,{new:true})
        await user.save()
        return {
            message: `User deleted`,
            status: 201,
            user
        }
    } catch (error) {
        console.log(error)
        return {
            message: `User not deleted`,
            status: 500
        }
    }
}

module.exports = {
    login,
    createdUser,
    updatedUser,
    deletedUser,
    findAllUser,
    findUserByEmail,
    findUserById
}