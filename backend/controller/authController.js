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

        if(error.name === "SequelizeValidationError"){
            const errors = error.errors.map(err =>({msg: err.message,path:err.path}))
            return res.status(400).json({errors})
        }
        next(error)
    }
}


exports.login = async (req,res,next)=>{
    const {username,password}= req.body
    if(!username || password){
        return res.status(400).json({message:"username and password are required"})
    }
    try {
        const user = await User.scope("withPassword").findOne({
            where:{
                username: username
            }
        })

        if(!user){
            return res.status(401).json({message:"invalid username or password"})
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"invalid username or password"})
        }

        req.session.userId = user.id;
        res.status(200).json({
            message:"login successfull"
        })
    } catch (error) {
        next(error)
    }
}