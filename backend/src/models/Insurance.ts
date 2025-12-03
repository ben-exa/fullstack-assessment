import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";
import { Resident } from "./Resident";

interface InsuranceAttributes {
	id: number;
	resident_id: number;
	insurance_provider: string;
	policy_number: string;
	group_number?: string;
	effective_date: Date;
	expiration_date?: Date;
}

export const Insurance = sequelize.define<Model<InsuranceAttributes>>(
	"Insurance",
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
		insurance_provider: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		policy_number: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		group_number: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		effective_date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		expiration_date: {
			type: DataTypes.DATEONLY,
			allowNull: true,
		},
	},
	{
		tableName: "insurances",
		timestamps: false,
	},
);

export type InsuranceType = Model<InsuranceAttributes>;
