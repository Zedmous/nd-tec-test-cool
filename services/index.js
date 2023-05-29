const users=require('./users.service')
const destinations=require('./destinations.services')

module.exports={
    ...users,
    ...destinations
}