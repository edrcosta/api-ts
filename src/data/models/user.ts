import { INTEGER, STRING } from 'sequelize';

export const UserModel = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER
    },
    username: {
        type: STRING,
        allowNull : false,
		trim: true,
		validate: {
			notNull: { msg: "username field is required" },
		}
    },
    password_hash: {
        type: STRING,
        allowNull : false,
		trim: true,
		validate: {
			notNull: { msg: "password_hash field is required" },
		}
    },
    password_salt: {
        type: STRING,
        allowNull : false,
		trim: true,
		validate: {
			notNull: { msg: "password_salt field is required" },
		}
    }
};
