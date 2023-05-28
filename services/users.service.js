const bcryptjs = require('bcryptjs');
const User = require('../models/user.model');
const { generateJWT } = require('../helpers');


const login = async (email = "", password = '') => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(email,password)
            const user = await findUserByEmail(email)
            console.log(user,"fuera del metodo")
            if (!user) {
                reject({
                    message: `The email user: ${email} does not exist.`,
                    status: 400
                })
            } else if (!user.status) {
                reject({
                    message: `The user: ${email} is inactive.`,
                    status: 400
                })
            } else {
                const passwordValid = await bcryptjs.compareSync(password, user.password)
                if (!passwordValid) {
                    reject({
                        message: `Email or password are wrong- wrong password`,
                        status: 400
                    })
                } else {
                    const token = await generateJWT(user.id);
                    resolve( {
                        message: `User logged in`,
                        status: 201,
                        user,
                        token
                    })
                }
            }
        } catch (error) {
            console.log(error)
            reject({
                message: `Contact the administrator`,
                status: 500
            })
        }
    })

}

const findUserById = async (datainput) => {
    let { id } = datainput;

    const user = await User.findById(id)
    if (user) {
        return user
    }
    return null;
}
const findUserByEmail = async (email="") => {

    const user = await User.findOne({ email })
    console.log("Encontre esto: ",user)
    if (user) {
        return user
    }
    return null;
}
const createUser = async (datainput) => {
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
        password: bcryptjs.hashSync(password, salt),
        img,
        role
    }
    try {
        const user = new User(datamodel)
        await user.save()
        return user;
    } catch (error) {
        console.log(error)
    }
    return null;
}

module.exports = {
    login,
    createUser,
    findUserByEmail,
    findUserById
}