const Product = require('../models/Product');
const QueryError = require('../../../../errors/QueryError');




class ProductService {
    async create(body) {
        const newProduct = {
            name: body.name,
            price: body.price,
            description: body.description,
            //image: body.image,
        };
        await Product.create(newProduct);
    }

    async getAll() {
        const products = await Product.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            }
        });
        if (!products) {
            throw new QueryError('Não há nenhum produto cadastrado');
        }
        return products;
    }

    async getById(id) {
        const product = await Product.findByPk(id, {
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            }
        });
        if (!product) {
            throw new QueryError(`Não há um produto com o ID ${id}!`);
        }
        return product;
    }

    async update(id, body) {
        const product = await Product.findByPk(id);
        if (!product) {
            throw new QueryError(`Não há um produto com o ID ${id}!`);
        }
        const newProduct = {
            name: body.name,
            price: body.price,
            description: body.description,
        };
        await product.update(newProduct);
    }

    async delete(id) {
        const product = await this.getById(id);
        if (!product) {
            throw new QueryError(`Não há um produto com o ID ${id}!`);
        }
        const key = product.image;
        await product.destroy();
        return key;
    }
}

module.exports = new ProductService;