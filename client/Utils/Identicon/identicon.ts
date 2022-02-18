import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-initials-sprites";

export const generateIdenticon = (seed: string) => {
	let svg = createAvatar(style, {
		seed,
		dataUri: true,
	});

	return svg.toString();
};
