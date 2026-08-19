const express = require('express');
const { getOrders, findOrder } = require('../controller/purchaseController');
const router = express.Router();

router.get("/Orders",
    getOrders
)


module.exports = router