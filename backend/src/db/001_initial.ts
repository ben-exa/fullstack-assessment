import { faker } from "@faker-js/faker";
import { sequelize } from "./sequelize";
import { Resident } from "../models/Resident";
import { Room } from "../models/Room";
import { BillingAddress } from "../models/BillingAddress";

export async function runMigration() {
	// Sync the database (create tables)
	await sequelize.sync({ force: false });

	// Check if we already have data to avoid duplicates
	const existingResidentCount = await Resident.count();
	const existingRoomCount = await Room.count();
	const existingBillingAddressCount = await BillingAddress.count();

	if (existingResidentCount === 0 && existingRoomCount === 0) {
		// First, create rooms
		const rooms = [];
		for (let i = 1; i <= 50; i++) {
			rooms.push({
				number: `Room ${i.toString().padStart(3, "0")}`,
			});
		}

		const createdRooms = await Room.bulkCreate(rooms);

		// Then, generate residents and assign them to rooms
		const residents = [];
		for (let x = 0; x < 100; x += 1) {
			const gender = faker.person.sex() as "male" | "female";
			const dob = faker.date.birthdate({
				max: 90,
				min: 45,
				mode: "age",
			});

			// Generate admission date between 1 day and 1 year ago
			const admissionDate = faker.date.between({
				from: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), // 1 year ago
				to: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
			});

			// Assign each resident to a random room
			const randomRoom = faker.helpers.arrayElement(createdRooms);

			residents.push({
				first_name: faker.person.firstName(),
				last_name: faker.person.lastName(),
				gender: gender,
				date_of_birth: dob,
				admission_date: admissionDate,
				room_id: (randomRoom as any).id,
				image_url: `https://api.dicebear.com/9.x/pixel-art/svg?seed=${Math.random()}`,
			});
		}

		// Bulk insert residents
		await Resident.bulkCreate(residents);
	}

	// Create billing addresses for existing residents if they don't exist
	if (existingBillingAddressCount === 0) {
		const allResidents = await Resident.findAll();
		const billingAddresses = [];

		for (const resident of allResidents) {
			const fullName = `${(resident as any).first_name} ${(resident as any).last_name}`;
			billingAddresses.push({
				resident_id: (resident as any).id,
				full_name: fullName,
				address_line_1: faker.location.streetAddress(),
				address_line_2: faker.helpers.maybe(
					() => faker.location.secondaryAddress(),
					{ probability: 0.3 },
				),
				city: faker.location.city(),
				zip_code: faker.location.zipCode(),
				state: faker.location.state(),
			});
		}

		// Bulk insert billing addresses
		await BillingAddress.bulkCreate(billingAddresses);
	}
}
