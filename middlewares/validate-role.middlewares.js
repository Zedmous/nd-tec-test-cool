const {request,response}=require('express')


const validateRoleAdmin =async (req = request, res = response, next)=>{
    const authUser = req.authUser;
    if (!authUser) {
        return res.status(500).json({
            msj: 'You want to verify the role without validating the token first'
        })
    }
    if (authUser.role != 'ADMIN_ROLE') {
        return res.status(401).json({
            msj: 'You do not have the necessary permissions, you are not an admin user'
        })
    }
    next();
}
module.exports={
    validateRoleAdmin
}