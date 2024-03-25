import { DataTypes, Model, } from 'sequelize';
import db from '../db/connection';
import { ModelCtor } from 'sequelize/types';

interface ProductAttributes {
    name: string;
    description?: string;
    price: number;
    stock: number;
}

export interface ProductInstance extends Model<ProductAttributes>, ProductAttributes {}

//Si en la base de datos está en nombre en plural aqui se coloca en singular
const Product = db.define<ProductInstance>('product', {
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            len: [1, 50],
        },
    },
    description: {
        type: DataTypes.STRING(100), 
        allowNull: true,
        validate: {
            len: [1, 100],
        },
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    stock: {
        type: DataTypes.NUMBER,
        allowNull: true,
    },
}, {
    tableName: 'product', // Especifica el nombre de la tabla
    timestamps: false,
});

export default Product as ModelCtor<ProductInstance>;