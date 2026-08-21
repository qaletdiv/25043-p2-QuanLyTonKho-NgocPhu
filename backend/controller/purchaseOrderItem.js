const { param } = require("express-validator");
const { PurchaseOrderItem,Sequelize, PurchaseOrder } = require("../model");


exports.getDetailPurchase = async (req,res,next)=>{
    try {
        const purchaseId = parseInt(req.param.purchaseId);
        const purchaseDetail = await PurchaseOrder.findByPk(purchaseId,{
            include:[{
                model:purchaseOrderItem,
                as:
            }]
        })
    } catch (error) {
        next(error)
    }
}