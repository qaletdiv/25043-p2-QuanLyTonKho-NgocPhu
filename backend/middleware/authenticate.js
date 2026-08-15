const { User } = require("../models");


const authenticate = async (req, res, next) => {
    if (req.session && req.session.userId) {
        try {
            const user = await User.findByPk(req.session.userId);

            if (!user) {
                req.session.destroy(err => {
                    if (err) {
                        console.log("error invalid session:", err);
                    }
                    res.status(401).json({ message: "Unauthorized. invalid session. please login again" });
                })
            } else {
                req.user = user;
                next();
            }
        } catch (error) {
            next(error)
        }
    }else{
        res.status(401).json({message:"unauthorized. login again"})
    }
}

module.exports = authenticate;