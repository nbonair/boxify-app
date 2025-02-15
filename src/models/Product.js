import { Sequelize, DataTypes, Model } from 'sequelize';

class ProductModel extends Model {
    static initModel(sequelize) {
        ProductModel.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },

                title: {
                    type: String,
                    allowNull: false
                },

                length: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },

                width: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },

                height: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },

                weight: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },

                userId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                }
            },
            {
                sequelize,
                modelName: 'Product',
                tableName: 'Products',
                timestamps: true
            }
        );
    }
    static associate(models) {
        ProductModel.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
    };
}


export default ProductModel;