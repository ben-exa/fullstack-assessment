import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/sequelize';
import { Room } from './Room';

// Define the attributes once
interface ResidentAttributes {
  id: number;
  first_name: string;
  last_name: string;
  image_url: string;
  gender: 'male' | 'female';
  date_of_birth: Date;
  admission_date: Date;
  room_id: number;
}

// Create the model with proper typing
export const Resident = sequelize.define<Model<ResidentAttributes>>('Resident', {
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
    type: DataTypes.ENUM('male', 'female'),
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
    references: {
      model: Room,
      key: 'id',
    },
  },
}, {
  tableName: 'residents',
  timestamps: false,
});

// Export the type for use in other files
export type ResidentType = Model<ResidentAttributes>;

// Define associations
Resident.belongsTo(Room, { foreignKey: 'room_id', as: 'room' });
Room.hasMany(Resident, { foreignKey: 'room_id', as: 'residents' });

