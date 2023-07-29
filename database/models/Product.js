module.exports = (sequelize, dataType) =>{
    const alias = 'Product';
    const cols = {
        id:{
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title:{
            type: dataType.STRING,
            allowNull: false
        },
        price:{
            type: dataType.INTEGER,
            allowNull: false
        },
        description:{
            type: dataType.STRING,
            allowNull: false
        },
        currency:{
            type: dataType.STRING
        },
        images:{
            type: dataType.ARRAY(dataType.STRING),
            allowNull: false
        },
        deleted: {
            type: dataType.INTEGER,
            allowNull: false
        },

        brand_id: {
        type: dataType.INTEGER,
        },
        
        category_id: {
            type: dataType.INTEGER,
        }
        
    }
    const config = {
        tableName: 'products',
        timestamps: false,
        paranoid: true
    }
    
    const Product = sequelize.define(alias, cols, config);

    Product.associate = models => {
        Product.belongsTo(models.Brand, {
            as: 'brand',
            foreignKey: 'brand_id'
        });
        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'category_id'
        });
        Product.hasMany(models.OrderItem, {
            as: 'orderItems',
            foreignKey: 'product_id'
        });
        /*Product.hasMany(models.Color, {
            as: 'colors',
            foreignKey: 'color_id'
        });*/
    }

    return Product;
}