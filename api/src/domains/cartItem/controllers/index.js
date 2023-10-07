const CartItemService = require('../services/CartItemService.js');
const statusCodes = require('../../../../utils/constants/statusCodes');
const {verifyJWT, checkRole} = require('../../../middlewares/auth-middlewares');
const router = require('express').Router();

// Rota para adicionar um item ao carrinho
router.post('/',
    verifyJWT, 
    checkRole(['admin', 'user']), // Middleware para verificar as permissões do usuário
    async (req, res, next) => {
        try {
            const user_id = req.user.id; 
            await CartItemService.create(req.body, user_id); 
            res.status(statusCodes.CREATED).end(); 
        } catch (error) {
            next(error); 
        }
    }
);

// Rota para obter todos os itens do carrinho de um usuário
router.get('/',
    verifyJWT, 
    checkRole(['admin', 'user']), 
    async (req, res, next) => {
        try {
            const user_id = req.user.id; 
            const cartItem = await CartItemService.getAll(user_id);
            res.status(statusCodes.SUCCESS).json(cartItem); // Responde com os itens do carrinho
        } catch(error){
            next(error); 
        }
    }
);

// Rota para obter um item específico do carrinho pelo ID
router.get('/:id',
    verifyJWT, 
    checkRole(['admin', 'user']), 
    async (req, res, next) => {
        try {
            const cartItem = await CartItemService.getById(req.params.id); 
            res.status(statusCodes.SUCCESS).json(cartItem); 
        } catch(error){
            next(error); 
        }
    }
);

// Rota para atualizar a quantidade de um item no carrinho pelo ID
router.put('/:id',
    verifyJWT, 
    checkRole(['admin', 'user']), 
    async (req, res, next) => {
        try {
            await CartItemService.update(req.params.id, req.body.amount); 
            res.status(statusCodes.NO_CONTENT).end(); 
        } catch(error){
            next(error); 
        }
    }
);

// Rota para excluir um item do carrinho pelo ID
router.delete('/:id',
    verifyJWT,
    checkRole(['admin', 'user']), 
    async (req, res, next) => {
        try {
            await CartItemService.delete(req.params.id); 
            res.status(statusCodes.NO_CONTENT).end(); 
        } catch(error){
            next(error); 
        }
    }
);

module.exports = router;
