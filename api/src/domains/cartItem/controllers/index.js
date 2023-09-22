/*const CartItemService = require('../services/CartItemService.js');
const statusCodes = require('../../../../utils/constants/statusCodes');

class CartItemController {
    async createCartItem(req, res, next) {
        try {
            const { userId, productId, amount } = req.body;
            await CartItemService.create({ userId, productId, amount });
            res.status(statusCodes.CREATED).end();
        } catch (error) {
            next(error);
        }
    }

    async getAllCartItems(req, res, next) {
        try {
            const { userId } = req.params;
            const cartItems = await CartItemService.getAll(userId);
            res.status(statusCodes.SUCCESS).json(cartItems);
        } catch (error) {
            next(error);
        }
    }

    async updateCartItem(req, res, next) {
        try {
            const { id } = req.params;
            const { amount } = req.body;
            await CartItemService.update(id, amount);
            res.status(statusCodes.NO_CONTENT).end();
        } catch (error) {
            next(error);
        }
    }

    async deleteCartItem(req, res, next) {
        try {
            const { id } = req.params;
            await CartItemService.delete(id);
            res.status(statusCodes.NO_CONTENT).end();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CartItemController();
*/