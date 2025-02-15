import { DataTypes, Model } from "sequelize";

class UserIdentity extends Model {
    static initModel(sequelize) {
        UserIdentity.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                provider: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                providerId: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                providerEmail: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                userId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                }
            }, {
            sequelize: sequelize,
            modelName: 'UserIdentity',
            tableName: 'UserIdentities',
            timestamps: true
        });
    }

    static associate(models) {
        UserIdentity.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });

    }
}

export default UserIdentity;