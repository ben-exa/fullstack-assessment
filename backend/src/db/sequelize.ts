import { Sequelize } from "sequelize";
import path from "path";

export const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: path.join(process.cwd(), "database.db"),
	logging: true, // Set to console.log to see SQL queries
});
