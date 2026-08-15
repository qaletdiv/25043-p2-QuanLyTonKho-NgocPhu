const express = require('express');
const { register } = require('../controller/authController');
const { registerValidator } = require('../validator/authValidator');
const handlerValidation = require('../middleware/validateErrorHandler');
const router = express.Router();


router.post("./register",
    registerValidator(),
    handlerValidation,
    register
)

module.exports = router