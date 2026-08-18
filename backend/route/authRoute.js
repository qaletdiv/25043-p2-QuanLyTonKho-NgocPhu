const express = require('express');
const { register, login, getMe, logout } = require('../controller/authController');
const { registerValidator, loginValidator } = require('../validator/authValidator');
const handlerValidation = require('../middleware/validateErrorHandler');
const authenticate = require('../middleware/authenticate');
const router = express.Router();


router.post("/register",
    registerValidator(),
    handlerValidation,
    register
)

router.post("/login",
    loginValidator(),
    handlerValidation,
    login
)

router.get("/logout",
    logout
)

router.get("/me",
    authenticate,
    getMe
)

module.exports = router