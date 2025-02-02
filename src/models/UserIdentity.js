import { DataTypes, Model } from "sequelize";
import sequelize from "./db.js";
import User from "./User.js";
class UserIdentity extends Model { }

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
            references: {
                model: User,
                key: 'id'
            }
        }
    }, {
    sequelize: sequelize,
    modelName: 'UserIdentity',
    tableName: 'UserIdentities',
    timestamps: true
});

User.hasMany(UserIdentity, { foreignKey: 'userId', as: 'identities' });
UserIdentity.belongsTo(User, { foreignKey: 'userId',targetKey: 'id', as: 'user' });

export default UserIdentity;