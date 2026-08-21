const {PurchaseOrder,Supplier,User , Sequelize} = require("../model");

exports.getOrders = async (req, res, next) => {
    try {
        const pageSize = parseInt(req.query.limit) || 10;
        const currentPage = parseInt(req.query.page) || 1;
        const search = req.query.search || "";
        const where = {};
        if (search) {
            //  tìm các supplier_id có tên khớp search
            const matchedSuppliers = await Supplier.findAll({
                where: { supplierName: { [Op.like]: `%${search}%` } },
                attributes: ['id'],
            });
            const supplierIds = matchedSuppliers.map(s => s.id);
            
            where[Op.or] = [
                { purchaseCode: { [Op.like]: `%${search}%` } },
                { supplier_id: { [Op.in]: supplierIds } }, 
            ];
        }

        const orders = await PurchaseOrder.findAndCountAll({
            where,
            include: [{ model: Supplier, as: 'supplier' }],
            limit: pageSize,
            offset: (currentPage - 1) * pageSize,
        });

        res.json({ data: orders.rows, total: orders.count }); // trả cho front end 2 data 1 là orders 2 là trang đã tính
    } catch (error) {
        next(error);
    }
};


exports.createOrder = async (req,res,next)=>{
    try {
        const newOrder = await PurchaseOrder.create(req.body);
        res.status(201).json(newOrder);

    } catch (error) {
        next(error)
    }
}