import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

// cloudinary setup ends here...

export const PROFILE_PRESET = "profile_image";
export const MESSAGE_PRESET = "message_image";

export type presetType = typeof PROFILE_PRESET | typeof MESSAGE_PRESET;

export const uploadImage = async (base64: string, preset: presetType) => {
	try {
		const cloudinaryResponse = await cloudinary.uploader.upload(base64, {
			upload_preset: preset,
		});

		if (!cloudinaryResponse) return null;
		return cloudinaryResponse;
	} catch (error) {
		console.log(error);
		return null;
	}
};
