import {
	randFirstName,
	randLastName,
	randGender,
	randBetweenDate,
	rand,
	randStreetAddress,
	randCity,
	randZipCode,
	randState,
	randChanceBoolean,
	randAlphaNumeric,
} from "@ngneat/falso";
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
			const gender = randGender() as "male" | "female";
			const age = Math.floor(Math.random() * (90 - 45 + 1)) + 45;
			const dob = randBetweenDate({
				from: new Date(Date.now() - (age + 1) * 365 * 24 * 60 * 60 * 1000),
				to: new Date(Date.now() - age * 365 * 24 * 60 * 60 * 1000),
			});

			const admissionDate = randBetweenDate({
				from: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
				to: new Date(Date.now() - 24 * 60 * 60 * 1000),
			});

			const randomRoom = rand(rooms);

			residents.push({
				first_name: randFirstName(),
				last_name: randLastName(),
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
				address_line_1: randStreetAddress(),
				address_line_2: randChanceBoolean({ chanceTrue: 0.3 })
					? `Apt ${Math.floor(Math.random() * 999) + 1}`
					: undefined,
				city: randCity(),
				zip_code: randZipCode(),
				state: randState(),
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
			const effectiveDate = randBetweenDate({
				from: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
				to: new Date(),
			});

			const policyNumber = Array.from({ length: 10 }, () => randAlphaNumeric())
				.join("")
				.toUpperCase();
			const groupNumber = randChanceBoolean({ chanceTrue: 0.7 })
				? Array.from({ length: 8 }, () => randAlphaNumeric())
						.join("")
						.toUpperCase()
				: undefined;

			insurances.push({
				resident_id: (resident as any).id,
				insurance_provider: rand(insuranceProviders),
				policy_number: policyNumber,
				group_number: groupNumber,
				effective_date: effectiveDate,
				expiration_date: randChanceBoolean({ chanceTrue: 0.5 })
					? randBetweenDate({
							from: effectiveDate,
							to: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
						})
					: undefined,
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
