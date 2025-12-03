import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { runMigration } from "./db/001_initial";
import { Resident, ResidentType } from "./models/Resident";
import { Room } from "./models/Room";
import { BillingAddress } from "./models/BillingAddress";
import { Insurance } from "./models/Insurance";
import { setupAssociations } from "./models/associations";
const APP_PORT = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware for artificial latency
const artificialLatency = (minMs: number = 500, maxMs: number = 5000) => {
	return async (_req: Request, _res: Response, next: any) => {
		const delay = Math.random() * (maxMs - minMs) + minMs;
		await new Promise((resolve) => setTimeout(resolve, delay));
		next();
	};
};

app.get(
	"/residents",
	artificialLatency(),
	async (_req, res: Response<{ data: ResidentType[] }>) => {
		const residents = await Resident.findAll({
			include: [
				{
					model: Room,
					as: "room",
				},
				{
					model: BillingAddress,
					as: "billing_address",
				},
				{
					model: Insurance,
					as: "insurances",
				},
			],
		});
		res.send({ data: residents });
	},
);

app.get("/status", (_req, res) => {
	res.send("🟢 exacare-fullstack-interview backend is up and running");
});

app.listen(APP_PORT, async () => {
	// Setup associations before running migration
	setupAssociations();
	await runMigration();
	console.log(
		`🟢 exacare-fullstack-interview backend listening on port ${APP_PORT}`,
	);
});

function errorHandler(err, _req, res, next) {
	if (res.headersSent) {
		return next(err);
	}
	console.error(res);
	return res.status(500).send("🛑 Something broke, check backend logs");
}

app.use(errorHandler);
