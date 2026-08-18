const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class PurchaseOrderItem extends Model {
        static associate(models) {
            PurchaseOrderItem.belongsTo(models.PurchaseOrder, {
                 foreignKey: 'purchase_order_id', as: 'purchaseOrder' 
                });
            PurchaseOrderItem.belongsTo(models.Product, {
                 foreignKey: 'product_id', as: 'product' 
                });
        }
    }

    PurchaseOrderItem.init({
        purchase_order_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unit_price: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        total_price: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "PurchaseOrderItem",
        tableName: "Purchase_order_items",
        timestamps: false,
    });

    return PurchaseOrderItem;
};