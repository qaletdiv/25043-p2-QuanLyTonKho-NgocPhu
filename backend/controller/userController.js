const { User, Sequelize } = require("../model");

exports.getUser  = async (req,res,next)=>{
    try {
        const user = await User.findAll();
        res.json(user)
    } catch (error) {
        next(error)
    }
}