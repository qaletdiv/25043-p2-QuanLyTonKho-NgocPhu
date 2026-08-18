const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class SalesOrder extends Model {
        static associate(models) {
            SalesOrder.belongsTo(models.User, {
                 foreignKey: 'assigned_employee_id', as: 'saler' 
                });
            SalesOrder.belongsTo(models.User, {
                 foreignKey: 'created_by', as: 'creator' 
                });
            SalesOrder.belongsTo(models.User, {
                 foreignKey: 'update_by', as: 'updater' 
                });
            SalesOrder.hasMany(models.SalesOrderItem, {
                 foreignKey: 'sales_order_id', as: 'items' 
                });
        }
    }

    SalesOrder.init({
        saleCode: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        customer_name: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        customer_phone: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        assigned_employee_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        subtotal: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
            defaultValue: 0,
        },
        discount_amount: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
            defaultValue: 0,
        },
        total_amount: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
            defaultValue: 0,
        },
        amount_paid: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
            defaultValue: 0,
        },
        change_amount: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
            defaultValue: 0,
        },
        payment_method: {
            type: DataTypes.ENUM('cash', 'transfer'),
            allowNull: false,
            defaultValue: 'cash',
        },
        status: {
            type: DataTypes.ENUM('paid', 'cancelled'),
            allowNull: false,
            defaultValue: 'paid',
        },
        created_by: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        update_by: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "SalesOrder",
        tableName: "Sales_orders",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return SalesOrder;
};