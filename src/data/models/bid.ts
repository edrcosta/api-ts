import { INTEGER, NUMBER, STRING } from 'sequelize';

export const BidModel = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER
    },
    email: {
        type: STRING,
        allowNull : false,
		trim: true,
		validate: {
			notNull: { msg: "item field is required" },
		}
    },
    amount: {
        type: NUMBER,
        allowNull : false,
		trim: true,
		validate: {
			notNull: { msg: "item field is required" },
		}
    },
    auctionId: {
        type: NUMBER,
        allowNull : false,
		trim: true,
		validate: {
			notNull: { msg: "item field is required" },
		}
    }
}