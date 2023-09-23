/*const CartItem = require('../models/CartItem');
const QueryError = require('../../../../errors/QueryError');





class CartItemService {
    async create(body, user_id, product_id) {
        const newCartItem = {
            userId: user_id,
            productId: product_id,
            amount: body.amount
        };
        await CartItem.create(newCartItem);
    }

    async getAll(user_id) {
        const cartItem = await CartItem.findAll({
            where: {userId : user_id}
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
        await CartItem.update(newCartItem);
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

module.exports = new CartItemService;*/