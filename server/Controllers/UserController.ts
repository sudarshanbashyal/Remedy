import { Request, Response } from "express";
import { returnServerError } from ".";
import { PrismaDB } from "..";
import { AuthRequestType, generateJWTToken } from "../Utils/Auth";
import { hashPassword, isCorrectPassword } from "../Utils/Bcrypt";

export const registerUser = async (req: Request, res: Response) => {
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			gender,
			dob,
			profilePicture,
		} = req.body;

		const user = await PrismaDB.user.create({
			data: {
				firstName,
				lastName,
				email,
				password: await hashPassword(password),
				gender,
				dob: new Date(dob),
				profilePicture,
			},
		});

		if (!user) {
			return res.status(500).json({
				ok: false,
				error: {
					message: "Couldn't create user.",
				},
			});
		}

		return res.status(201).json({
			ok: true,
			user,
		});
	} catch (error) {
		return returnServerError(error as Error, res);
	}
};

export const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user = await PrismaDB.user.findUnique({
			where: {
				email,
			},
			include: {
				medicines: {
					include: {
						schedules: true,
					},
				},
			},
		});

		if (!user) {
			return res.status(404).json({
				ok: false,
				error: {
					message: "The user doesn't exist",
				},
			});
		}

		if (!(await isCorrectPassword(password, user.password))) {
			return res.status(401).json({
				ok: false,
				error: {
					message: "Invalid Credentials",
				},
			});
		}

		// sign JWT token
		const token = generateJWTToken(user.userId);

		return res.json({
			ok: true,
			user: { ...user, token },
		});
	} catch (error) {
		return returnServerError(error as Error, res);
	}
};

export const emailExists = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;
		const user = await PrismaDB.user.findUnique({
			where: { email },
		});

		if (!user) {
			return res.json({
				ok: true,
				emailExists: false,
			});
		}

		return res.status(400).json({
			ok: false,
			emailExists: true,
		});
	} catch (error) {
		return returnServerError(error as Error, res);
	}
};

export const fetchUser = async (req: AuthRequestType, res: Response) => {
	try {
		const { userId } = req;

		if (!userId) {
			return res.status(404).json({
				ok: false,
				error: {
					message: "Unauthorized token or the user doesn't exist.",
				},
			});
		}

		const user = await PrismaDB.user.findUnique({
			where: {
				userId,
			},
			include: {
				medicines: {
					include: {
						frequencies: true,
					},
				},
			},
		});

		if (!user) {
			return res.status(404).json({
				ok: false,
				error: {
					message: "Unauthorized token or the user doesn't exist.",
				},
			});
		}

		return res.json({
			ok: true,
			user,
		});
	} catch (error) {
		return returnServerError(error as Error, res);
	}
};
