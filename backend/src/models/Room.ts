import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/sequelize';

// Define the attributes once
interface RoomAttributes {
  id: number;
  number: string;
}

// Create the model with proper typing
export const Room = sequelize.define<Model<RoomAttributes>>('Room', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'rooms',
  timestamps: false,
});

// Export the type for use in other files
export type RoomType = Model<RoomAttributes>;
