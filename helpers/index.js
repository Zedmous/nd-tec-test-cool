const generateJWT=require('./generate-jwt.helpers')
const validateUsers=require('./validate-users.helpers')
const validateDestinations=require('./validate-destinations.helpers')
const validateUploadArchive=require('./upload-archive.helpers')
const validateRoutes=require('./validate-routes')
module.exports={
    ...generateJWT,
    ...validateUsers,
    ...validateDestinations,
    ...validateUploadArchive,
    ...validateRoutes
}