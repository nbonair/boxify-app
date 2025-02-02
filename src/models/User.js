import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from './db.js';
class User extends Model { }

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

export default User;