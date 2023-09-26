const CartItem = require('../models/CartItem');
const QueryError = require('../../../../errors/QueryError');
const Product = require('../../products/models/Product');





class CartItemService {
    async create(body, userId) {
        const newCartItem = {
            userId: userId,
            productId: body.productId,
            amount: body.amount
        };
        await CartItem.create(newCartItem);
    }

    async getAll(userId) {
        const cartItem = await CartItem.findAll({
            where: {userId : userId},
            include: { 
                model: Product,
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            }
        });
        if (!cartItem) {
            throw new QueryError('Não há nenhum produto no carrinho');
        }
        return cartItem;
    }

    async update(id, newAmount) {
        const cartItem = await CartItem.findByPk(id);
        if (!cartItem) {
            throw new QueryError(`Não há um produto no carrinho com o ID ${id}!`);
        }
        const newCartItem = {
            amount: newAmount,
        };
        await cartItem.update(newCartItem);
    }

    async delete(id) {
        const cartItem = await CartItem.findByPk(id);
        if (!cartItem) {
            throw new QueryError(`Não há um produto no carrinho com o ID ${id}!`);
        }
        await cartItem.destroy();
        return id;
    }

}

module.exports = new CartItemService;