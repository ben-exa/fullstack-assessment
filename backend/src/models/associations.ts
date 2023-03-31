import { Resident } from './Resident';
import { Room } from './Room';
import { BillingAddress } from './BillingAddress';

// Define all associations in one place to avoid circular dependencies
export function setupAssociations() {
  // Room and Resident associations
  Resident.belongsTo(Room, { foreignKey: 'room_id', as: 'room' });
  Room.hasMany(Resident, { foreignKey: 'room_id', as: 'residents' });

  // Resident and BillingAddress associations
  Resident.hasOne(BillingAddress, { foreignKey: 'resident_id', as: 'billing_address' });
  BillingAddress.belongsTo(Resident, { foreignKey: 'resident_id', as: 'resident' });
}
