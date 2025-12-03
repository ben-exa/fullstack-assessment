import { faker } from "@faker-js/faker";
import { sequelize } from "./sequelize";
import { Resident } from "../models/Resident";
import { Room } from "../models/Room";
import { BillingAddress } from "../models/BillingAddress";
import { Insurance } from "../models/Insurance";

class InitialMigration {
	private async insertRooms() {
		const rooms = [];
		for (let i = 1; i <= 50; i++) {
			rooms.push({
				number: `Room ${i.toString().padStart(3, "0")}`,
			});
		}

		return await Room.bulkCreate(rooms);
	}

	private async insertResidents(
		rooms: Awaited<ReturnType<typeof Room.bulkCreate>>,
	): Promise<void> {
		const residents = [];
		for (let x = 0; x < 100; x += 1) {
			const gender = faker.person.sex() as "male" | "female";
			const dob = faker.date.birthdate({
				max: 90,
				min: 45,
				mode: "age",
			});

			const admissionDate = faker.date.between({
				from: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
				to: new Date(Date.now() - 24 * 60 * 60 * 1000),
			});

			const randomRoom = faker.helpers.arrayElement(rooms);

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

		await Resident.bulkCreate(residents);
	}

	private async insertBillingAddresses(): Promise<void> {
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

		await BillingAddress.bulkCreate(billingAddresses);
	}

	private async insertInsurances(): Promise<void> {
		const allResidents = await Resident.findAll();
		const insurances = [];
		const insuranceProviders = [
			"Blue Cross Blue Shield",
			"Medicare",
			"Medicaid",
			"Aetna",
			"UnitedHealthcare",
			"Cigna",
			"Humana",
			"Kaiser Permanente",
		];

		for (const resident of allResidents) {
			const effectiveDate = faker.date.between({
				from: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
				to: new Date(),
			});

			insurances.push({
				resident_id: (resident as any).id,
				insurance_provider: faker.helpers.arrayElement(insuranceProviders),
				policy_number: faker.string.alphanumeric({
					length: 10,
					casing: "upper",
				}),
				group_number: faker.helpers.maybe(
					() => faker.string.alphanumeric({ length: 8, casing: "upper" }),
					{ probability: 0.7 },
				),
				effective_date: effectiveDate,
				expiration_date: faker.helpers.maybe(
					() =>
						faker.date.between({
							from: effectiveDate,
							to: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
						}),
					{ probability: 0.5 },
				),
			});
		}

		await Insurance.bulkCreate(insurances);
	}

	public async run(): Promise<void> {
		await sequelize.sync({ force: false });

		const existingResidentCount = await Resident.count();
		const existingRoomCount = await Room.count();
		const existingBillingAddressCount = await BillingAddress.count();
		const existingInsuranceCount = await Insurance.count();

		if (existingResidentCount === 0 && existingRoomCount === 0) {
			const createdRooms = await this.insertRooms();
			await this.insertResidents(createdRooms);
		}

		if (existingBillingAddressCount === 0) {
			await this.insertBillingAddresses();
		}

		if (existingInsuranceCount === 0) {
			await this.insertInsurances();
		}
	}
}

export async function runMigration() {
	const migration = new InitialMigration();
	await migration.run();
}
