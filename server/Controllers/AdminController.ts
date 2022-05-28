import { Response } from "express";
import { serverError } from ".";
import { PrismaDB } from "..";
import { AuthRequestType } from "../Utils/Auth";
import { sendVerificationEmail } from "../Utils/SendGrid";

export const getAllDoctors = async (req: AuthRequestType, res: Response) => {
	try {
		const doctors = await PrismaDB.user.findMany({
			where: {
				role: "Doctor",
			},
			select: {
				userId: true,
				bio: true,
				firstName: true,
				lastName: true,
				email: true,
				verified: true,
				profilePicture: true,
				createdAt: true,
				professionalDetails: true,
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

export const updateDoctorVerification = async (
	req: AuthRequestType,
	res: Response
) => {
	try {
		const { userId } = req.params;
		const { verification } = req.body;

		const updatedUser = await PrismaDB.user.update({
			where: {
				userId,
			},
			data: {
				verified: verification,
			},
		});

		if (updatedUser.verified) {
			const { email, firstName, lastName } = updatedUser;
			await sendVerificationEmail(email, firstName, lastName);
		}

		return res.json({
			ok: true,
		});
	} catch (error) {
		return serverError(error as Error, res);
	}
};
