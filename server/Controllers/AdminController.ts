import { Response } from "express";
import { serverError } from ".";
import { PrismaDB } from "..";
import { AuthRequestType } from "../Utils/Auth";

export const getAllDoctors = async (req: AuthRequestType, res: Response) => {
	try {
		const doctors = await PrismaDB.user.findMany({
			where: {
				role: "Doctor",
			},
			select: {
				userId: true,
				firstName: true,
				lastName: true,
				verified: true,
				profilePicture: true,
			},
		});

		return res.json({
			ok: true,
			data: doctors,
		});
	} catch (error) {
		return serverError(error as Error, res);
	}
};
