
const authorize = (allowedRoles) =>{
    const role = Array.isArray(allowedRoles)? allowedRoles : [allowedRoles];

    return (req,res,next) =>{
        if(!req.session.userid || !req.session.role){
            return res.status(403).json({ messae: "ko the xac dinh vai tro nguoi dungg" })

        }

        const userRole = req.session.role;
        if(!role.includes(userRole)){
            return res.status(403).json({messae:"ban ko co quyen"})
        }

        next()
    }
}

module.exports = authorize;