import { Sequelize, DataTypes, Model } from 'sequelize';

class BoxModel extends Model {
    static initModel(sequelize) {
        BoxModel.init(
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
                }
            },
            {
                sequelize,
                modelName: 'Box',
                tableName: 'Boxes',
                timestamps: true
            }
        );
        
    }
    static associate(models) {
        BoxModel.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
    }
}

export default BoxModel;