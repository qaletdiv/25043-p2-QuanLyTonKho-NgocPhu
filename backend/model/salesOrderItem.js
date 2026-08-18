const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class SalesOrderItem extends Model {
        static associate(models) {
            SalesOrderItem.belongsTo(models.SalesOrder, {
                 foreignKey: 'sales_order_id', as: 'salesOrder' 
                });
            SalesOrderItem.belongsTo(models.Product, {
                 foreignKey: 'product_id', as: 'product' 
                });
        }
    }

    SalesOrderItem.init({
        sales_order_id: {
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
        modelName: "SalesOrderItem",
        tableName: "Sales_order_items",
        timestamps: false,
    });

    return SalesOrderItem;
};