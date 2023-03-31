import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";

// Define the attributes once
interface ResidentAttributes {
	id: number;
	first_name: string;
	last_name: string;
	image_url: string;
	gender: "male" | "female";
	date_of_birth: Date;
	admission_date: Date;
	room_id: number;
}

// Create the model with proper typing
export const Resident = sequelize.define<Model<ResidentAttributes>>(
	"Resident",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image_url: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		gender: {
			type: DataTypes.ENUM("male", "female"),
			allowNull: true,
		},
		date_of_birth: {
			type: DataTypes.DATEONLY,
			allowNull: true,
		},
		admission_date: {
			type: DataTypes.DATEONLY,
			allowNull: true,
		},
		room_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	},
	{
		tableName: "residents",
		timestamps: false,
	},
);

// Export the type for use in other files
export type ResidentType = Model<ResidentAttributes>;

// Associations are now defined in /models/associations.ts to avoid conflicts
