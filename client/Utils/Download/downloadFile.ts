import { showToast } from "../../Utils/Toast";
import { PermissionsAndroid } from "react-native";
import RNFS, { downloadFile, DownloadResult } from "react-native-fs";

const getRealFileName = (name: string): string => {
	return name.split("/")[1];
};

export const handleDownload = async ({ name, content }) => {
	try {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
		);

		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			const { promise }: { promise: Promise<DownloadResult> } =
				downloadFile({
					fromUrl: content,
					toFile: `${RNFS.DownloadDirectoryPath}/${getRealFileName(
						name
					)}`,
				});

			const { statusCode } = await promise;
			if (statusCode === 200) {
				showToast("success", "File Downloaded Successfully!");
			}
		}
	} catch (error) {
		showToast("error", "Could not download file. Please try again.");
	}
};
