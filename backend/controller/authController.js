const { User, Sequelize } = require("../model");
const bcrypt = require("bcrypt");



exports.register = async (req,res,next)=>{
    try {
        const {username,email,password} = req.body;
        const saltRound = 10;
        const hashPass = await bcrypt.hash(password,saltRound);
        
        const newUser = await User.create({
            username,
            email,
            password:hashPass
        })

        res.status(201).json({message:"dang ky thanh cong"});
    } catch (error) {
        if(error.name === "SequelizeUniqueConstraintError"){
            const field = error.errors[0].path; //lay truong loi dau tien xem thu error o user hay email
            return res.status(409).json({
                error:[
                    {msg:`${field} da ton tai`,path: field,location:"body"},
                ],
            });
        }

        if(error.name === "SequelizeUniqueConstraintError"){
            const error = error.errors.map(err =>({msg: err.message,path:err.path}))
            return res.status(400).json({errors})
        }
        next(error)
    }
}