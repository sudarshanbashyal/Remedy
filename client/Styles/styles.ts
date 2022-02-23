import { Dimensions, StyleSheet } from "react-native";
import { colors } from "./Colors";

const styles = StyleSheet.create({
	fullContainer: {
		flex: 1,
		width: "100%",
		height: "80%",
		position: "relative",
		minHeight: Dimensions.get("window").height,
		backgroundColor: colors.primaryGray,
	},
	bottomNavigation: {
		backgroundColor: colors.primaryGray,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		paddingVertical: 15,
	},
	chatTitleContainer: {
		marginTop: 10,
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
		marginBottom: 50,
		paddingHorizontal: 20,
	},
	chatTitle: {
		fontFamily: "Poppins-Bold",
		color: colors.primaryRed,
		fontSize: 16,
	},
	chatPreview: {
		paddingHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		borderBottomColor: colors.lightGray,
		borderBottomWidth: 2,
		paddingBottom: 20,
		marginBottom: 20,
	},
	chatPreviewImageContainer: {
		height: 35,
		width: 35,
		marginRight: 15,
	},
	chatPreviewIcon: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
		borderRadius: 50,
	},
	chatPreviewInfo: {
		width: "65%",
	},
	chatPreviewName: {
		color: colors.primaryWhite,
		fontFamily: "Poppins-SemiBold",
		fontSize: 14,
	},
	chatPreviewMessage: {
		color: colors.lightWhite,
		fontFamily: "Poppins-Light",
		fontSize: 12,
		opacity: 0.6,
	},
	chatPreviewRight: {
		height: "100%",
		position: "absolute",
		right: 20,
		top: 0,
	},
	chatPreviewTime: {
		position: "absolute",
		top: 0,
		right: 0,
	},
	chatUnread: {
		height: 5,
		width: 5,
		position: "absolute",
		bottom: 10,
		right: 0,
		borderRadius: 50,
		backgroundColor: colors.primaryRed,
	},

	pageHeader: {
		paddingHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingBottom: 15,
		marginBottom: 15,
		borderBottomColor: colors.lightGray,
		borderBottomWidth: 2,
	},
	pageHeaderText: {
		fontFamily: "Poppins-Medium",
		color: colors.primaryWhite,
		marginLeft: 5,
	},
	pageHeaderNavigation: {
		flexDirection: "row",
		alignItems: "center",
	},
	pageHeaderIcons: {
		flexDirection: "row",
		alignItems: "center",
	},
	pageHeaderIcon: {
		marginLeft: 20,
	},

	leftChatBubbleContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
	},
	leftBubbleTextContainer: {
		backgroundColor: colors.lightGray,
		marginLeft: 10,
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 8,
		borderBottomLeftRadius: 0,
		marginBottom: 10,
		maxWidth: "75%",
	},
	leftBubbleText: {
		fontFamily: "Poppins-Medium",
		color: colors.lightWhite,
		opacity: 0.8,
	},

	rightChatBubbleContainer: {
		flexDirection: "row-reverse",
		alignItems: "center",
	},
	rightBubbleTextContainer: {
		backgroundColor: colors.primaryBlue,
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 8,
		borderBottomRightRadius: 0,
		marginBottom: 10,
		maxWidth: "75%",
	},
	imageTextContainer: {
		paddingVertical: 0,
		paddingHorizontal: 0,
		backgroundColor: colors.primaryGray,
	},
	messageImageContainer: {
		width: "100%",
		height: 225,
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "flex-end",
	},
	messageImage: {
		height: "100%",
		width: "100%",
		resizeMode: "cover",
	},
	rightImage: {
		borderRadius: 8,
		borderBottomRightRadius: 0,
	},
	leftImage: {
		borderRadius: 8,
		borderBottomLeftRadius: 0,
	},
	chatScreenMessageContainer: {
		paddingVertical: 5,
		flexDirection: "row",
	},
	chatScreenMessage: {
		width: "100%",
		textAlign: "center",
		fontFamily: "Poppins-Medium",
		color: colors.opaqueWhite,
		fontSize: 12,
	},

	chatInputContainer: {
		position: "absolute",
		right: 0,
		paddingVertical: 10,
		paddingHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.primaryGray,
	},
	chatInput: {
		flex: 1,
		borderRadius: 8,
		backgroundColor: colors.lightGray,
		color: colors.primaryWhite,
		paddingVertical: 7,
		paddingHorizontal: 10,
		maxHeight: 100,
	},
	chatInputPreviewContainer: {
		height: 90,
		width: "100%",
		position: "absolute",
		left: 30,
		bottom: 15,
		flexDirection: "row",
		alignItems: "center",
	},
	chatInputImageContainer: {
		height: "100%",
		width: 90,
	},
	chatInputImage: {
		height: "100%",
		width: "100%",
		resizeMode: "cover",
		borderRadius: 8,
	},
	chatImageRemove: {
		marginLeft: 10,
	},

	scheduleBody: {
		paddingHorizontal: 20,
		marginTop: 15,
	},
	scheuleTitle: {
		fontFamily: "Poppins-Bold",
		color: colors.primaryWhite,
		marginBottom: 15,
		fontSize: 14,
	},
	inputStyle: {
		fontFamily: "Poppins-Medium",
		width: "100%",
		backgroundColor: colors.lightGray,
		borderRadius: 8,
		color: colors.lightWhite,
		opacity: 0.8,
		paddingVertical: 7,
		paddingHorizontal: 10,
		marginBottom: 10,
	},
	scheduleTimeContainer: {
		position: "relative",
		flexDirection: "row",
		justifyContent: "flex-start",
		marginBottom: 30,
	},
	scheduleTimeInput: {
		fontFamily: "Poppins-Medium",
		width: 60,
		backgroundColor: colors.lightGray,
		borderRadius: 8,
		color: colors.lightWhite,
		opacity: 0.8,
		textAlign: "center",
	},
	scheduleBlockContainer: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	scheduleBlockText: {
		fontFamily: "Poppins-Medium",
		color: colors.opaqueWhite,
	},
	scheduleHalfContainer: {
		flexDirection: "row",
		marginLeft: 20,
	},
	scheduleHalf: {
		height: 50,
		width: 60,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.lightGray,
		borderRadius: 8,
		marginRight: 10,
	},
	scheduleHalfText: {
		fontFamily: "Poppins-Medium",
		fontSize: 16,
		color: colors.primaryWhite,
	},
	schedulePlusContainer: {
		height: 50,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		right: 0,
		top: 0,
	},
	scheduleActiveText: {
		fontFamily: "Poppins-Medium",
		color: colors.opaqueWhite,
		marginRight: 5,
	},
	scheduleActiveContainer: {
		marginTop: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
	},

	scheduleDaysContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 20,
	},
	scheduleDay: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	scheduleDayDot: {
		height: 20,
		width: 20,
		borderRadius: 10,
		backgroundColor: colors.lightGray,
		marginBottom: 5,
	},
	scheduleDayName: {
		fontFamily: "Poppins-Medium",
		color: colors.opaqueWhite,
	},

	scheduleActionsContainer: {
		marginTop: 50,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
		paddingBottom: 15,
	},
	scheduleCancel: {
		fontFamily: "Poppins-Bold",
		color: colors.opaqueWhite,
		marginRight: 15,
	},
	blueButtonContainer: {
		backgroundColor: colors.primaryBlue,
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 8,
		flexDirection: "row",
		alignSelf: "center",
		justifyContent: "center",
	},
	blueButton: {
		fontFamily: "Poppins-Medium",
		color: colors.primaryWhite,
	},

	chatMediaContainer: {
		paddingHorizontal: 20,
	},
	chatMediaSearchContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	chatFilesLayoutContainer: {
		marginTop: 30,
		flexWrap: "wrap",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	chatFilesContainer: {
		width: 100,
		height: 150,
		marginBottom: 20,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	chatFilesImageContainer: {
		width: "100%",
		height: 100,
	},
	chatFileImages: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
	chatFilesOtherContainer: {
		width: "100%",
		height: 100,
		borderRadius: 8,
		borderWidth: 5,
		borderColor: colors.opaqueWhite,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	chatFileExtension: {
		fontFamily: "Poppins-Bold",
		color: colors.opaqueWhite,
		fontSize: 20,
		textTransform: "uppercase",
	},
	chatFileName: {
		fontFamily: "Poppins-Medium",
		color: colors.opaqueWhite,
		marginTop: 10,
		textAlign: "center",
	},

	bottomTabIconContainer: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	selectedTabDot: {
		backgroundColor: colors.primaryRed,
		height: 5,
		width: 5,
		borderRadius: 10,
		marginBottom: 5,
	},
	bottomTabImageContainer: {
		height: 25,
		width: 25,
	},
	bottomTabImage: {
		height: "100%",
		width: "100%",
		borderRadius: 50,
		resizeMode: "cover",
	},

	medicineStatsContainer: {
		marginTop: 10,
		paddingHorizontal: 20,
	},
	medicineGraphContainer: {
		paddingHorizontal: 20,
		marginTop: 50,
	},
	lineGraphTitleContainer: {
		width: "100%",
		marginBottom: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	lineGraphTitleText: {
		fontFamily: "Poppins-Medium",
		color: colors.primaryWhite,
	},
	lineGraphDropDownContainer: {
		width: 200,
	},
	lineGraphDropdown: {
		borderWidth: 0,
		fontFamily: "Poppins-Medium",
	},

	medicineListContainer: {
		marginTop: 10,
		paddingHorizontal: 20,
	},
	medicineListActions: {
		width: "100%",
		marginTop: 30,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
	},
	medicineLists: {
		minHeight: 300,
		marginTop: 40,
	},
	medicine: {
		backgroundColor: colors.lightGray,
		paddingVertical: 12,
		paddingHorizontal: 15,
		borderRadius: 8,
		marginBottom: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
	},
	inactiveMedicineStatus: {
		borderLeftWidth: 5,
		borderLeftColor: colors.primaryYellow,
	},
	activeMedicineStatus: {
		borderLeftWidth: 5,
		borderLeftColor: colors.primaryBlue,
	},
	medicineName: {
		fontFamily: "Poppins-Medium",
		color: colors.primaryWhite,
	},
	medicineFrequency: {
		marginTop: 5,
		fontFamily: "Poppins-Medium",
		color: colors.opaqueWhite,
	},
	medicineFrequencyContainer: {
		marginTop: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	activeFrequencyText: {
		marginRight: 10,
		color: colors.primaryWhite,
	},
	inactiveFrequencyTest: {
		marginRight: 10,
		color: colors.opaqueWhite,
	},
	noMedicineContainer: {
		backgroundColor: colors.lightGray,
		marginTop: 30,
		borderRadius: 8,
		paddingHorizontal: 15,
		paddingVertical: 15,
	},
	noDataTitle: {
		fontFamily: "Poppins-SemiBold",
		fontSize: 15,
		color: colors.primaryWhite,
	},
	noDataText: {
		marginTop: 5,
		fontFamily: "Poppins-Regular",
		fontSize: 10,
		color: colors.opaqueWhite,
	},

	profileContainer: {
		marginTop: 20,
		paddingHorizontal: 20,
	},
	profileInfoContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingBottom: 40,
		marginBottom: 40,
		borderBottomColor: colors.lightGray,
		borderBottomWidth: 1,
	},
	profileInfoUserContainer: {
		flex: 1,
	},
	profileInfoImageContainer: {
		width: 75,
		height: 75,
		marginRight: 20,
		position: "relative",
	},
	profileInfoImage: {
		width: "100%",
		height: "100%",
		borderRadius: 100,
		resizeMode: "cover",
	},
	profileInfoName: {
		color: colors.primaryWhite,
		fontFamily: "Poppins-Bold",
		marginBottom: 5,
	},
	profileInfoBio: {
		color: colors.opaqueWhite,
		fontFamily: "Poppins-Regular",
		fontSize: 12,
		marginBottom: 20,
	},
	profileInfoFlexContainer: {
		flexDirection: "row",
	},
	profileAdditionalInfo: {
		marginRight: 20,
		color: colors.opaqueWhite,
		fontFamily: "Poppins-Medium",
		fontSize: 12,
		marginBottom: 10,
	},

	profileNavigationContainer: {
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: colors.lightGray,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	profileNavigationIcon: {
		marginRight: 20,
	},
	profileNavigationTitle: {
		marginBottom: 5,
		fontFamily: "Poppins-Bold",
		color: colors.primaryWhite,
	},
	profileNavigationText: {
		fontFamily: "Poppins-Medium",
		color: colors.opaqueWhite,
		fontSize: 12,
	},
	profileImageFlexContainer: {
		flexDirection: "column",
		alignItems: "center",
		borderRadius: 100,
	},
	profileActionsContainer: {
		marginTop: 30,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	profileImageCancelContainer: {
		position: "absolute",
		top: 10,
		right: -10,
		zIndex: 99,
	},

	settingsContainer: {
		paddingHorizontal: 20,
		marginTop: 30,
	},
	profileSettingsFlexContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	accountInfoContainer: {},
	accountInfoTitle: {
		fontFamily: "Poppins-Bold",
		color: colors.primaryWhite,
		marginBottom: 10,
	},
	accountInfoText: {
		fontFamily: "Poppins-Regular",
		color: colors.opaqueWhite,
		fontSize: 11,
	},
	whiteTextButton: {
		marginTop: 10,
		fontFamily: "Poppins-Medium",
		color: colors.primaryWhite,
	},
	redTextButton: {
		fontFamily: "Poppins-Bold",
		color: colors.primaryRed,
	},

	loginFlexContainer: {
		height: "100%",
		paddingHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	loginContainer: {
		width: "100%",
	},

	logOutContainer: {
		marginTop: 40,
		paddingTop: 40,
		borderTopColor: colors.lightGray,
		borderTopWidth: 1,
	},
	loginTitle: {
		fontFamily: "Poppins-Bold",
		color: colors.primaryWhite,
		marginBottom: 30,
	},
	loginNavigationText: {
		fontFamily: "Poppins-Regular",
		color: colors.opaqueWhite,
		fontSize: 12,
		marginTop: 10,
	},
	loginCTAContainer: {
		marginTop: 30,
		width: "100%",
	},

	registerStepContainer: {
		marginTop: 30,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	registerBackContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	registerStepBackButton: {
		fontFamily: "Poppins-Medium",
		color: colors.opaqueWhite,
	},

	errorContainer: {
		marginBottom: 20,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: colors.primaryRed,
		paddingHorizontal: 10,
		paddingVertical: 10,
	},

	errorText: {
		fontFamily: "Poppins-Regular",
		color: colors.primaryRed,
	},
});

export default styles;
