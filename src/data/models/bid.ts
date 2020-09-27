import { INTEGER, NUMBER, STRING } from 'sequelize';

export const BidModel = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER
    },
    item: {
        type: STRING,
        allowNull : false,
		trim: true,
		validate: {
			notNull: { msg: "item field is required" },
		}
    }
};

