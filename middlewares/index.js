const validateFields=require('./validate-fields.middlewares')
const validateJWT=require('./validate-jwt.middlewares')
const validateRol=require('./validate-role.middlewares')
module.exports={
    ...validateFields,
    ...validateJWT,
    ...validateRol
}