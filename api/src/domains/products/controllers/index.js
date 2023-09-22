const ProductService = require('../services/ProductService');
const router = require('express').Router();
const {verifyJWT, checkRole} = require('../../../middlewares/auth-middlewares');
const statusCodes = require('../../../../utils/constants/statusCodes');
const multerConfig = require('../../../middlewares/multer');
const multer = require('multer');
const fs = require('fs');
const util = require('util');
const path = require('path');



router.post('/',
    verifyJWT,  
    checkRole(['admin']),
    multer(multerConfig).single('image'),
    async (req, res, next) => {
        try {
            const product = {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                image: req.file.filename,
            }
            await ProductService.create(product);
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
            const key = await ProductService.delete(req.params.id);
            util.promisify(fs.unlink)(
                path.resolve(__dirname, '..', 'images', key)
            );
            res.status(statusCodes.NO_CONTENT).end();
        } catch(error){
            next(error);
        }
    }
);

module.exports = router;