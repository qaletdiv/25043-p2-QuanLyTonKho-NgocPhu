const {PurchaseOrder,Supplier,User , Sequelize} = require("../model");

exports.getOrders = async (req,res,next)=>{
    try {
        const pageSize = parseInt(req.query.limit) || 10;
        const currentPage = parseInt(req.query.page) || 1;
        const search = req.query.search || "";
        const where = {};
        if(search){
            where[Sequelize.Op.or] = [
                {
                    purchaseCode: {[Sequelize.Op.like]:`%${search}%`}
                },
                {
                    '$supplier.supplierName$': {[Sequelize.Op.like]:`%${search}%`} //dùng association tham chiếu tới cột của bảng đã JOIN
                }
            ]
        }
        const orders = await PurchaseOrder.findAndCountAll({   // cần dùng findcountall là để trả về bản ghi ko áp limit và có áp limit
            // trả lại total page được tính cho frontend phân trang
            // find chỉ trả rows
            where,
            include:[
                {model:Supplier,as:'supplier',attributes:['id','supplierName']},
                {model:User,as:'assignedEmployee',attributes:['id','username']}
            ],
            // khai báo model supplier với alias là supplier để Sequelize biết cần left join bảng nào
            limit:pageSize,
            offset:(currentPage-1)*pageSize,
            subQuery: false, // bắt buộc khi where tham chiếu tới field của bảng include kèm limit/offset
        });

        if(!orders){
            return res.status(400).json([]);
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