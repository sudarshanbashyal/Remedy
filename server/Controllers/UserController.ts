import { UploadApiResponse } from "cloudinary";
import { Request, Response } from "express";
import { serverError } from ".";
import { PrismaDB } from "..";
import { AuthRequestType, generateJWTToken } from "../Utils/Auth";
import { hashPassword, isCorrectPassword } from "../Utils/Bcrypt";
import { PROFILE_PRESET, uploadImage } from "../Utils/clouinary";

export const registerUser = async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, email, password, gender, dob } = req.body;

		const user = await PrismaDB.user.create({
			data: {
				firstName,
				lastName,
				email,
				password: await hashPassword(password),
				gender,
				dob: new Date(dob),
				profilePicture: `https://avatars.dicebear.com/api/initials/${
					firstName[0] + lastName[0]
				}.png`,
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
		return serverError(error as Error, res);
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
		return serverError(error as Error, res);
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
		return serverError(error as Error, res);
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
						schedules: true,
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
		return serverError(error as Error, res);
	}
};

export const updateUserProfile = async (
	req: AuthRequestType,
	res: Response
) => {
	try {
		const { userId } = req;
		const { firstName, lastName, bio, dob, profilePicture, gender } =
			req.body;

		let imageLink = null;

		// upload profile picture first
		if (profilePicture) {
			const encodedImage: UploadApiResponse | null = await uploadImage(
				`data:image/jpeg;base64,${profilePicture}`,
				PROFILE_PRESET
			);

			if (encodedImage) {
				console.log(encodedImage);
				imageLink = encodedImage.secure_url;
			}
		}

		// update user profile
		const user = await PrismaDB.user.update({
			where: {
				userId: userId as string,
			},
			data: {
				firstName,
				lastName,
				bio,
				dob,
				gender,
				...(imageLink && { profilePicture: imageLink }),
			},
			select: {
				firstName: true,
				lastName: true,
				bio: true,
				dob: true,
				profilePicture: true,
				gender: true,
			},
		});

		if (!user) {
			return res.status(500).json({
				ok: false,
				error: {
					message: "Couldn't update profile.",
				},
			});
		}

		return res.status(201).json({
			ok: true,
			data: user,
		});
	} catch (error) {
		return serverError(error as Error, res);
	}
};

export const getMessageList = async (req: AuthRequestType, res: Response) => {
	try {
		const { userId } = req;

		const messageList = await PrismaDB.chat.findMany({
			where: {
				OR: [
					{
						firstUser: userId as string,
					},
					{
						secondUser: userId as string,
					},
				],
			},
			select: {
				chatId: true,
				firstParticipant: {
					select: {
						userId: true,
						profilePicture: true,
						firstName: true,
						lastName: true,
					},
				},
				secondParticipant: {
					select: {
						userId: true,
						profilePicture: true,
						firstName: true,
						lastName: true,
					},
				},
				messages: {
					select: {
						authorId: true,
						date: true,
						content: true,
						type: true,
					},
					orderBy: {
						date: "desc",
					},
					take: 1,
				},
			},
		});

		return res.json({
			ok: true,
			data: messageList,
		});
	} catch (error) {
		return serverError(error as Error, res);
	}
};
