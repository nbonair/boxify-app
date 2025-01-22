import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from './db';
import User from './User';
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
            type: DataTypes.FLOAT,
            allowNull: false,
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