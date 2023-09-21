const ProductService = require('./ProductService');
const router = require('express').Router();
const {verifyJWT, checkRole} = require('../../../middlewares/auth-middlewares');
const statusCodes = require('../../../../utils/constants/statusCodes');


router.post('/',
    verifyJWT,  
    checkRole(['admin']),
    async (req, res, next) => {
        try {
            await ProductService.create(req.body);
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
            const products = await ProductService.getAll();
            res.status(statusCodes.SUCCESS).json(products);
        } catch(error){
            next(error);
        }
    },
);

router.get('/:id',
    verifyJWT,
    checkRole(['admin', 'user']),
    async (req, res, next) => {
        try {
            const product = await ProductService.getById(req.params.id);
            res.status(statusCodes.SUCCESS).json(product);
        } catch(error){
            next(error);
        }
    },
);

router.put('/:id',
    verifyJWT,
    checkRole(['admin']),
    async (req, res, next) => {
        try {
            await ProductService.update(req.params.id, req.body);
            res.status(statusCodes.NO_CONTENT).end();
        } catch(error){
            next(error);
        }
    },
);

router.delete('/:id',
    verifyJWT,
    checkRole(['admin']),
    async (req, res, next) => {
        try {
            await ProductService.delete(req.params.id);
            res.status(statusCodes.NO_CONTENT).end();
        } catch(error){
            next(error);
        }
    }
);