import { INTEGER, NUMBER, STRING, DATE } from 'sequelize';

export const AudictionModel = {
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
    },
    description: {
        type: STRING,
        allowNull : false,
		trim: true,
		validate: {
			notNull: { msg: "description field is required" },
		}
    },
    email: {
        type: STRING,
        allowNull : false,
		trim: true,
		validate: {
			notNull: { msg: "email field is required" },
		}
    },
    startingPrice: {
        type: NUMBER,
        allowNull : false,
		trim: true,
		validate: {
			notNull: { msg: "startingPrice field is required" },
		}
    },
    winningBidId: {
        type: NUMBER,
        allowNull : false,
		trim: true,
		validate: {
			notNull: { msg: "winningBidId field is required" },
		}
    },
    // 'waiting', 'ongoing', 'finished'
    status: {
        type: STRING,
        allowNull : false,
		trim: true,
		validate: {
			notNull: { msg: "status field is required" },
		}
    },
    startTime: {
        type: DATE,
        allowNull : false,
		trim: true,
		validate: {
			notNull: { msg: "neiborhood field is required" },
		}
    },
};

