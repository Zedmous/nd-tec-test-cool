const generateJWT=require('./generate-jwt.helpers')
const validateUsers=require('./validate-users.helpers')
const validateDestinations=require('./validate-destinations.helpers')
module.exports={
    ...generateJWT,
    ...validateUsers,
    ...validateDestinations
}