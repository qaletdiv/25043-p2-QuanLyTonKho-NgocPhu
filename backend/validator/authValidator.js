const {body} =require("express-validator");

const registerValidator = ()=>{
    return [
        body("username")
            .notEmpty().withMessage("username ko duoc trong")
            .isLength({min:3, max: 30}).withMessage("user name phai tu 3-30 ky tu" )
            .trim(),
        body("email")
            .notEmpty().withMessage("email ko duoc de trong")
            .isEmail().withMessage("email ko hop le")
            .normalizeEmail(),
        body("password")
            .notEmpty().withMessage("password ko duoc de trong")
            .isLength({min:6}).withMessage("password phai co it nhat 6 ky tu")

    ]
}

const loginValidator = ()=>{
    return [
        body("emailOrusername")
            .notEmpty().withMessage("username ko duoc trong"),

        body("password")
            .notEmpty().withMessage("password ko duoc de trong")

    ]
}

module.exports = {registerValidator,loginValidator}