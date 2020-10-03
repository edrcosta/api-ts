import { INTEGER, NUMBER, STRING, DECIMAL } from 'sequelize';

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
			notNull: { msg: "email field is required" },
		}
    },
    amount: {
        type: DECIMAL,
        allowNull : false,
		trim: true,
		validate: {
			notNull: { msg: "amount field is required" },
		}
    },
    auctionId: {
        type: NUMBER,
        allowNull : true,
		trim: true,
    }
}