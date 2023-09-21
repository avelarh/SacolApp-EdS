const Product = require('../models/Product');
const QueryError = require('../../../../errors/QueryError');




class ProductService {
    async create(body) {
        const newProduct = {
            name: body.name,
            price: body.price,
            description: body.description,
            image: body.image,
        };
        await Product.create(newProduct);
    }

    async getAll() {
        const products = await Product.findAll({
            attributes: ['id', 'name', 'price', 'description', 'image'],
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
        await product.update(body);
    }

    async delete(id) {
        const product = await this.getById(id);
        await product.destroy();
    }
}

module.exports = new ProductService;