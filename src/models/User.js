import { Sequelize, DataTypes, Model } from 'sequelize';

class UserModel extends Model {
	static initModel(sequelize) {
		UserModel.init(
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
		UserModel.hasMany(models.Box, {foreignKey: `userId`, as:`boxes`});
		UserModel.hasMany(models.UserIdentity, {foreignKey: `userId`, as: `identities`});
		UserModel.hasMany(models.Product, {foreignKey: `userId`, as: `products`});
	}
}
export default UserModel;