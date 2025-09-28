import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";
import { Resident } from "./Resident";

// Define the attributes for BillingAddress
interface BillingAddressAttributes {
	id: number;
	resident_id: number;
	full_name: string;
	address_line_1: string;
	address_line_2?: string;
	city: string;
	zip_code: string;
	state: string;
}

// Create the model with proper typing
export const BillingAddress = sequelize.define<Model<BillingAddressAttributes>>(
	"BillingAddress",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		resident_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Resident,
				key: "id",
			},
		},
		full_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		address_line_1: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		address_line_2: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		zip_code: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		state: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "billing_addresses",
		timestamps: false,
	},
);

// Export the type for use in other files
export type BillingAddressType = Model<BillingAddressAttributes>;

// Associations will be defined in a separate file to avoid circular dependencies
