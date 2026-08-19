const {PurchaseOrder , Sequelize} = require("../model");
const purchaseOrder = require("../model/purchaseOrder");

exports.getOrders = async (req,res,next)=>{
    try {
        const pageSize = parseInt(req.query.limit) || 10;
        const currentPage = parseInt(req.query.page) || 1;
        const search = req.query.search || "";
        const where = {};
        if(search){
            where[Sequelize.Op.or] = [
                {
                    title: {[Sequelize.Op.like]:`%${search}%`}
                },
                {
                    content: {[Sequelize.Op.like]:`%${search}%`}
                }
            ]
        }
        const orders = await PurchaseOrder.findAll({
            where,
            limit:pageSize,
            offset:(currentPage-1)*pageSize
        });

        if(!orders){
            return res.status(400).json({message:"ko tim thay don hang ton tai"});
        }
        
        res.json(orders);
    } catch (error) {
        next(error)
    }
}

//A3
// exports.createOrder = async (req,res,next)=>{
//     try {
//         const {purchaseCode,supplier_id,order_date,assigned_employee_id,total_cost,status}
//         const newOrder = await PurchaseOrder.create();

//     } catch (error) {
        
//     }
// }