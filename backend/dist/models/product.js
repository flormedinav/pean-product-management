"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
//Si en la base de datos está en nombre en plural aqui se coloca en singular
const Product = connection_1.default.define('product', {
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        validate: {
            len: [1, 50],
        },
    },
    description: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        validate: {
            len: [1, 100],
        },
    },
    price: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true,
    },
    stock: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true,
    },
}, {
    tableName: 'product', // Especifica el nombre de la tabla
    timestamps: false,
});
exports.default = Product;
