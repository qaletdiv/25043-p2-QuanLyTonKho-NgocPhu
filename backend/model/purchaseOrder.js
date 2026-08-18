const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class PurchaseOrder extends Model {
        static associate(models) {
            PurchaseOrder.belongsTo(models.Supplier, {
                 foreignKey: 'supplier_id', as: 'supplier' 
                });

            PurchaseOrder.belongsTo(models.User, {
                 foreignKey: 'assigned_employee_id', as: 'assignedEmployee' 
                });
                
            PurchaseOrder.belongsTo(models.User, {
                 foreignKey: 'created_by', as: 'creator' 
                });

            PurchaseOrder.belongsTo(models.User, {
                 foreignKey: 'update_by', as: 'updater' 
                });

            PurchaseOrder.hasMany(models.PurchaseOrderItem, {
                 foreignKey: 'purchase_order_id', as: 'items' 
                });
        }
    }

    PurchaseOrder.init({
        purchaseCode: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        supplier_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        assigned_employee_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        order_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        total_cost: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
            defaultValue: 0,
        },
        status: {
            type: DataTypes.ENUM('draft', 'confirmed', 'stocked'),
            allowNull: false,
            defaultValue: 'draft',
        },
        note: {
            type: DataTypes.TEXT,
            allowNull: true,
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
        modelName: "PurchaseOrder",
        tableName: "Purchase_orders",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return PurchaseOrder;
};