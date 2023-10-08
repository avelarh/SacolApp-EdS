const sequelize = require('../../../../database/index');
const User = require('../../users/models/User');
const Product = require('../../products/models/Product');
const {DataTypes} = require('sequelize');


const CartItem = sequelize.define('CartItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

//User.hasMany(CartItem);

User.hasMany(CartItem, {
    foreignKey: "userId",
    onDelete: 'CASCADE',
});

CartItem.belongsTo(User, {
    foreignKey: "userId",
});

Product.hasMany(CartItem, {
    foreignKey: "productId",
    onDelete: 'CASCADE',
});

CartItem.belongsTo(Product, {
    foreignKey: "productId",
})

CartItem.sync({alter: false, force: false})
  .then(() => {
    console.log('CartItem table was created');
  })
  .catch((err) => console.log(err));

module.exports = CartItem;

