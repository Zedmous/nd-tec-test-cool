const validateFields=require('./validate-fields.middlewares')
const validateJWT=require('./validate-jwt.middlewares')
module.exports={
    ...validateFields,
    ...validateJWT
}