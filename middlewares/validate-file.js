const { response, request } = require("express")



const validateArchive=(req=request,res=response,next)=>{
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({msj: 'No files were uploaded.'});
    }
    next()
}

module.exports={
    validateArchive
}