import { Response } from "express";
import { returnServerError } from ".";
import { PrismaDB } from "..";
import { AuthRequestType } from "../Utils/Auth";

export const addMedicine = async (req: AuthRequestType, res: Response) => {
	try {
		const { userId } = req;
		const { name, description, days, schedules, isActive } = req.body;

		const medicine = await PrismaDB.medicine.create({
			data: {
				name,
				description,
				days,
				userId: userId as string,
				active: isActive,
			},
		});
		if (!medicine) {
			return res.status(500).json({
				ok: false,
				error: {
					message: "Couldn't store medicine data.",
				},
			});
		}

		const { medicineId } = medicine;
		const allSchedules = schedules.map((schedule: any) => {
			const minutes = +schedule.minutes;
			let hour = +schedule.hour;

			hour = schedule.half === "AM" ? hour : hour + 12;

			return {
				hour,
				minutes,
				medicineId,
			};
		});

		// save schedules with the medicine id
		const savedScheules = await PrismaDB.schedule.createMany({
			data: allSchedules,
		});

		if (!savedScheules) {
			return res.status(500).json({
				ok: false,
				error: {
					message: "Couldn't store medicine data.",
				},
			});
		}

		// save frequencies with the medicine id
		await PrismaDB.frequency.create({
			data: {
				medicineId,
				frequencyPerWeek: schedules.length * days.length,
			},
		});

		// final medicine with all the schedules
		const finalMedicineDetails = await PrismaDB.medicine.findUnique({
			where: {
				medicineId,
			},
			include: {
				schedules: true,
			},
		});

		return res.status(201).json({
			ok: true,
			data: finalMedicineDetails,
			message: "Medicine Schedule Saved.",
		});
	} catch (error) {
		return returnServerError(error as Error, res);
	}
};

export const getMedicineList = async (req: AuthRequestType, res: Response) => {
	try {
		const { userId } = req;

		const medicineDetails = await PrismaDB.medicine.findMany({
			where: {
				userId: userId as string,
			},
			include: {
				schedules: true,
				frequencies: {
					orderBy: {
						date: "desc",
					},
					take: 1,
				},
			},
		});

		return res.json({
			ok: true,
			data: medicineDetails,
		});
	} catch (error) {
		return returnServerError(error as Error, res);
	}
};

export const getMedicineDetails = async (
	req: AuthRequestType,
	res: Response
) => {
	try {
		const { userId } = req;
		const { medicineId } = req.params;

		const medicine = await PrismaDB.medicine.findFirst({
			where: {
				medicineId,
				userId: userId as string,
			},
			include: {
				schedules: true,
			},
		});

		if (!medicine) {
			return res.status(404).json({
				ok: false,
				error: {
					message: "No medicine with the given id found.",
				},
			});
		}

		return res.json({
			ok: true,
			data: medicine,
		});
	} catch (error) {
		return returnServerError(error as Error, res);
	}
};

export const updateMedicine = async (req: AuthRequestType, res: Response) => {
	try {
		const { medicineId } = req.params;
		const { name, description, days, schedules, isActive } = req.body;

		await PrismaDB.medicine.update({
			where: {
				medicineId: medicineId as string,
			},
			data: {
				name,
				description,
				days,
				active: isActive,
			},
		});

		// delete previous scheules first before updating this medicine
		await PrismaDB.schedule.deleteMany({
			where: {
				medicineId: medicineId as string,
			},
		});

		const allSchedules = schedules.map((schedule: any) => {
			const minutes = +schedule.minutes;
			let hour = +schedule.hour;

			hour = schedule.half === "AM" ? hour : hour + 12;

			return {
				hour,
				minutes,
				medicineId,
			};
		});

		// save schedules with the medicine id
		const savedScheules = await PrismaDB.schedule.createMany({
			data: allSchedules,
		});

		if (!savedScheules) {
			return res.status(500).json({
				ok: false,
				error: {
					message: "Couldn't store medicine data.",
				},
			});
		}

		// save frequencies with the medicine id
		await PrismaDB.frequency.create({
			data: {
				medicineId: medicineId as string,
				frequencyPerWeek: schedules.length * days.length,
			},
		});

		// final medicine with all the schedules
		const finalMedicineDetails = await PrismaDB.medicine.findUnique({
			where: {
				medicineId: medicineId as string,
			},
			include: {
				schedules: true,
			},
		});

		return res.status(201).json({
			ok: true,
			data: finalMedicineDetails,
			message: "Medicine Schedule Saved.",
		});
	} catch (error) {
		return returnServerError(error as Error, res);
	}
};

export const getFrequencies = async (req: AuthRequestType, res: Response) => {
	try {
		const { userId } = req;

		const frequencies = await PrismaDB.frequency.findMany({
			where: {
				medicine: {
					userId: userId as string,
				},
			},
		});

		return res.json({
			ok: true,
			data: frequencies,
		});
	} catch (error) {
		return returnServerError(error as Error, res);
	}
};
