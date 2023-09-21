const sequelize = require('../../../../database/index');
const {DataTypes} = require('sequelize');


const Product = sequelize.define('Products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Product.sync({alter: true, force: false})
  .then(() => {
    console.log('Product table was (re)created');
  })
  .catch((err) => console.log(err));

module.exports = Product;