const CartItemService = require('../services/CartItemService.js');
const statusCodes = require('../../../../utils/constants/statusCodes');
const {verifyJWT, checkRole} = require('../../../middlewares/auth-middlewares');
const router = require('express').Router();

router.post('/',
    verifyJWT,
    checkRole(['admin', 'user']),
    async (req, res, next) => {
        try {
            const user_id = req.user.id;
            await CartItemService.create(req.body, user_id);
            res.status(statusCodes.CREATED).end();
        } catch (error) {
            next(error);
        }
    },
);

router.get('/',
    verifyJWT,
    checkRole(['admin', 'user']),
    async (req, res, next) => {
        try {
            const user_id = req.user.id;
            const cartItem = await CartItemService.getAll(user_id);
            res.status(statusCodes.SUCCESS).json(cartItem);
        } catch(error){
            next(error);
        }
    },
);

router.put('/:id',
    verifyJWT,
    checkRole(['admin', 'user']),
    async (req, res, next) => {
        try {
            const cartItem = await CartItemService.update(req.params.id, req.body.amount);
            res.status(statusCodes.NO_CONTENT).end();
        } catch(error){
            next(error);
        }
    },
);

router.delete('/:id',
    verifyJWT,
    checkRole(['admin', 'user']),
    async (req, res, next) => {
        try {
            const cartItem = await CartItemService.delete(req.params.id);
            res.status(statusCodes.NO_CONTENT).end();
        } catch(error){
            next(error);
        }
    },
);

module.exports = router;