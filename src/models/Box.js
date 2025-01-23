import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from './db.js';
import User from './User.js';
class Box extends Model { }

Box.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        length: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        width: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        height: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        maxWeight: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: 'Box',
        tableName: 'Boxes',
        timestamps: true
    }
);

Box.belongsTo(User, {foreignKey: 'userId', as: 'user'});
User.hasMany(Box, {foreignKey: 'userId', as: 'boxes'});

export default Box;