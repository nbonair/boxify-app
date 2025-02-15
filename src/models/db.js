import { Model, Sequelize } from "sequelize";
import dotenv from 'dotenv';
import UserModel from "./User.js";
import UserIdentityModel from "./UserIdentity.js";
import ProductModel from "./Product.js";
import BoxModel from "./Box.js";

dotenv.config();

const isCloudDB = process.env.USE_CLOUD_DB === 'true';

const sequelize = isCloudDB
    ? new Sequelize(process.env.DB_CLOUD_URL, {
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    })
    : new Sequelize(
        process.env.DB_LOCAL_NAME,
        process.env.DB_LOCAL_USER,
        process.env.DB_LOCAL_PASS,
        {
            host: process.env.DB_LOCAL_HOST,
            port: parseInt(process.env.DB_LOCAL_PORT, 10),
            dialect: 'postgres',
            logging: false
        }
    );

const models = {
    Box: BoxModel.initModel(sequelize),
    Product: ProductModel.initModel(sequelize),
    User: UserModel.initModel(sequelize),
    UserIdentity: UserIdentityModel.initModel(sequelize),
}

Object.keys(models).forEach(model => {
    if (model.associate) {model.associate(models)}
});

await sequelize.authenticate();

export const Box = sequelize.models.Box;
export const Product = sequelize.models.Product;
export const User = sequelize.models.User;
export const UserIdentity = sequelize.models.UserIdentity;

export default sequelize;