const {Model} = require("sequelize");

module.exports= (sequelize,DataTypes)=>{
    class User extends Model{
        static associate(models){

        }
    }

    User.init({
        username:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },{
        sequelize,
        moduleName: "User",
        tableName: "Users", // ten bang trong mysql
        timestamps: false, // create at update at
        defaultScope: {
            attributes: {exclude: ["password"]}
        },

        scopes:{
            withPassword:{
                attributes:{}
            }
        }
    })
    return User;
}