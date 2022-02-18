import cloudinary from "./clouinarySetup";

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
