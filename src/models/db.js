import { Model, Sequelize } from "sequelize";
import dotenv from 'dotenv';
import logger from "../utils/logger.js";
import User from "./User.js";
import UserIdentity from "./UserIdentity.js";
import Product from "./Product.js";
import Box from "./Box.js";

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
    Box: Box.initModel(sequelize),
    Product: Product.initModel(sequelize),
    User: User.initModel(sequelize),
    UserIdentity: UserIdentity.initModel(sequelize),
}

Object.values(models).keys(model => {
    if (model.associate) {model.associate(models)}
});

export { sequelize, models };

export default sequelize;