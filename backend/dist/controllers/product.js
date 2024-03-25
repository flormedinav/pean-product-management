"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.postProduct = exports.deleteProduct = exports.getProduct = exports.getProducts = void 0;
const sequelize_1 = require("sequelize");
const product_1 = __importDefault(require("../models/product"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        console.log({ name });
        if (name) {
            const products = yield product_1.default.findAll({
                where: {
                    name: {
                        [sequelize_1.Op.iLike]: `%${name}%`
                    }
                }
            });
            return res.json({
                msg: 'OK - Product found',
                data: products
            });
        }
        const listProducts = yield product_1.default.findAll();
        res.json({
            msg: 'OK - All products',
            data: listProducts
        });
    }
    catch (error) {
        res.json({
            msg: `Error: ${error}`,
        }).status(500);
    }
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield product_1.default.findByPk(id);
        if (product) {
            res.json({
                msg: 'OK - Product',
                data: product
            });
        }
        else {
            res.json({
                msg: 'Product not found',
            }).status(404);
        }
    }
    catch (error) {
        res.json({
            msg: `Error: ${error}`,
        }).status(500);
    }
});
exports.getProduct = getProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield product_1.default.findByPk(id);
        if (!product) {
            res.json({
                msg: 'Product not found',
            }).status(404);
        }
        else {
            const productInstance = product;
            yield product.destroy();
            res.json({
                msg: `Producto ${productInstance.name} borrado con éxito.`,
            });
        }
    }
    catch (error) {
        res.json({
            msg: `Error: ${error}`,
        }).status(500);
    }
});
exports.deleteProduct = deleteProduct;
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const newProduct = yield product_1.default.create(body);
        res.json({
            msg: `Producto ${body.name} creado con éxito.`,
            data: newProduct
        });
    }
    catch (error) {
        res.json({
            msg: `Error: ${error}`,
        }).status(500);
    }
});
exports.postProduct = postProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const { id } = req.params;
        const product = yield product_1.default.findByPk(id);
        if (product) {
            const updateProduct = yield product.update(body);
            res.json({
                msg: `Producto ${body.name} actualizado con éxito.`,
                data: updateProduct
            });
        }
        else {
            res.json({
                msg: 'Product not found',
            }).status(404);
        }
    }
    catch (error) {
        res.json({
            msg: `Error: ${error}`,
        }).status(500);
    }
});
exports.updateProduct = updateProduct;
