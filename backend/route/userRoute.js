const express = require('express');
const { getUser } = require('../controller/userController');
const router = express.Router();

router.get("/getusers",
    getUser
)
module.exports = router