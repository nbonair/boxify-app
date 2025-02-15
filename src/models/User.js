import { Sequelize, DataTypes, Model } from 'sequelize';

class User extends Model {
	static initModel(sequelize) {
		User.init(
			{
				id: {
					type: DataTypes.UUID,
					defaultValue: DataTypes.UUIDV4,
					primaryKey: true,
				},
				email: {
					type: DataTypes.STRING,
					unique: true,
					allowNull: false,
				},
				planType: {
					type: DataTypes.ENUM('FREE', 'PAID'),
					defaultValue: 'FREE',
					allowNull: false,
				},
			},
			{
				sequelize,
				modelName: 'User',
				tableName: 'Users',
				timestamps: true
			}
		);
	}

	static associate(models) {
		User.hasMany(models.Box, {foreignKey: `userId`, as:`boxes`});
		User.hasMany(models.UserIdentity, {foreignKey: `userId`, as: `identities`});
	}
}
export default User;