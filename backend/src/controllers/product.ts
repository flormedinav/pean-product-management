import { Request, Response } from 'express'
import { Op } from 'sequelize';
import Product, { ProductInstance } from '../models/product'

export const getProducts = async (req: Request, res: Response) => {
    try {
        const { name } = req.query;
        console.log({name})

        if(name){
            const products = await Product.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                }
            });

            return res.json({
                msg: 'OK - Product found',
                data: products
            });
        }

        const listProducts = await Product.findAll();

        res.json({
            msg: 'OK - All products',
            data: listProducts
        })
    } catch (error) {
        res.json({
            msg: `Error: ${error}`,
        }).status(500);
    }
}

export const getProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; 

        const product = await Product.findByPk(id);

        if(product){
            res.json({
                msg: 'OK - Product',
                data: product
            });
        } else {
            res.json({
                msg: 'Product not found',
            }).status(404);
        }
    } catch (error) {
        res.json({
            msg: `Error: ${error}`,
        }).status(500);
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; 

        const product = await Product.findByPk(id);

        if(!product){
            res.json({
                msg: 'Product not found',
            }).status(404);
        } else {
            const productInstance = product as ProductInstance;

            await product.destroy();

            res.json({
                msg: `Producto ${productInstance.name} borrado con éxito.`,
            });
        }
    } catch (error) {
        res.json({
            msg: `Error: ${error}`,
        }).status(500);
    }
}

export const postProduct = async (req: Request, res: Response) => {
    try {
        const { body } = req; 

        const newProduct = await Product.create(body)

        res.json({
            msg: `Producto ${body.name} creado con éxito.`,
            data: newProduct
        })
    } catch (error) {
        res.json({
            msg: `Error: ${error}`,
        }).status(500);
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { body } = req; 
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if(product){
            const updateProduct = await product.update(body);

            res.json({
                msg: `Producto ${body.name} actualizado con éxito.`,
                data: updateProduct
            })
        } else {
            res.json({
                msg: 'Product not found',
            }).status(404);
        }
    } catch (error) {
        res.json({
            msg: `Error: ${error}`,
        }).status(500);
    }
}