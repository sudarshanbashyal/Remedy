import { Dimensions, StyleSheet } from "react-native";
import { colors } from "./Colors";

export const dimens = {
	small: 5,
	regular: 10,
	medium: 20,
	large: 30,
	xLarge: 35,
	xxLarge: 50,
};

const fonts = {
	Poppins: {
		light: "Poppins-Light",
		regular: "Poppins-Regular",
		medium: "Poppins-Medium",
		semi: "Poppins-SemiBold",
		bold: "Poppins-Bold",
	},
	size: {
		small: 12,
		regular: 14,
		medium: 16,
		large: 18,
	},
};

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
		paddingVertical: dimens.regular,
	},
	chatTitleContainer: {
		marginTop: dimens.regular,
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
		marginBottom: dimens.xxLarge,
		paddingHorizontal: dimens.medium,
	},
	mailScreenTitle: {
		fontFamily: fonts.Poppins.bold,
		color: colors.primaryWhite,
		fontSize: fonts.size.medium,
	},
	chatPreview: {
		paddingHorizontal: dimens.medium,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		borderBottomColor: colors.lightGray,
		borderBottomWidth: 2,
		paddingBottom: dimens.medium,
		marginBottom: dimens.medium,
	},
	chatPreviewImageContainer: {
		height: dimens.xLarge,
		width: dimens.xLarge,
		marginRight: dimens.regular,
	},
	chatPreviewIcon: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
		borderRadius: dimens.xxLarge,
	},
	chatPreviewInfo: {
		width: "65%",
	},
	chatPreviewName: {
		color: colors.primaryWhite,
		fontFamily: fonts.Poppins.semi,
		fontSize: fonts.size.regular,
	},
	chatPreviewMessage: {
		color: colors.lightWhite,
		fontFamily: fonts.Poppins.light,
		fontSize: fonts.size.small,
		opacity: 0.6,
	},
	chatPreviewRight: {
		height: "100%",
		position: "absolute",
		right: dimens.medium,
		top: 0,
	},
	chatPreviewTime: {
		position: "absolute",
		top: 0,
		right: 0,
	},
	chatUnread: {
		height: dimens.small,
		width: dimens.small,
		position: "absolute",
		bottom: dimens.regular,
		right: 0,
		borderRadius: dimens.xxLarge,
		backgroundColor: colors.primaryRed,
	},

	pageHeader: {
		paddingHorizontal: dimens.medium,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingBottom: dimens.regular + 5,
		marginBottom: dimens.regular + 5,
		borderBottomColor: colors.lightGray,
		borderBottomWidth: 2,
	},
	pageHeaderText: {
		fontFamily: fonts.Poppins.medium,
		color: colors.primaryWhite,
		marginLeft: dimens.small,
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
		marginLeft: dimens.medium,
	},

	leftChatBubbleContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
	},
	leftBubbleTextContainer: {
		backgroundColor: colors.lightGray,
		paddingHorizontal: dimens.regular + 5,
		paddingVertical: dimens.regular,
		borderRadius: 8,
		borderBottomLeftRadius: 0,
		marginBottom: dimens.regular,
		maxWidth: "75%",
	},
	leftBubbleText: {
		fontFamily: fonts.Poppins.medium,
		color: colors.lightWhite,
		opacity: 0.8,
		fontSize: fonts.size.small + 1,
	},

	rightChatBubbleContainer: {
		flexDirection: "row-reverse",
		alignItems: "center",
	},
	rightBubbleTextContainer: {
		backgroundColor: colors.primaryBlue,
		paddingHorizontal: dimens.regular + 5,
		paddingVertical: dimens.regular,
		borderRadius: 8,
		borderBottomRightRadius: 0,
		marginBottom: dimens.regular,
		maxWidth: "75%",
	},
	imageTextContainer: {
		paddingVertical: 0,
		paddingHorizontal: 0,
		backgroundColor: colors.primaryGray,
	},
	messageFileContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	messageFileDownloadIcon: {
		marginRight: dimens.regular,
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
		borderRadius: dimens.small + 3,
		borderBottomRightRadius: 0,
	},
	leftImage: {
		borderRadius: dimens.small + 3,
		borderBottomLeftRadius: 0,
	},
	chatScreenMessageContainer: {
		paddingVertical: dimens.small,
		flexDirection: "row",
	},
	chatScreenMessage: {
		width: "100%",
		textAlign: "center",
		fontFamily: fonts.Poppins.medium,
		color: colors.opaqueWhite,
		fontSize: fonts.size.small,
	},

	chatInputContainer: {
		position: "absolute",
		right: 0,
		paddingVertical: dimens.regular,
		paddingHorizontal: dimens.medium,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.primaryGray,
	},
	chatInputIconContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	chatInput: {
		flex: 1,
		borderRadius: dimens.small + 3,
		backgroundColor: colors.lightGray,
		color: colors.primaryWhite,
		paddingVertical: dimens.small + 2,
		paddingHorizontal: dimens.regular,
		maxHeight: dimens.xxLarge * 2,
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
	chatInputFileContainer: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	chatInputFileName: {
		fontFamily: fonts.Poppins.medium,
		color: colors.opaqueWhite,
		marginTop: dimens.small,
	},
	chatInputImage: {
		height: "100%",
		width: "100%",
		resizeMode: "cover",
		borderRadius: dimens.small + 3,
	},
	chatImageRemove: {
		marginLeft: dimens.regular,
	},

	scheduleBody: {
		paddingHorizontal: dimens.medium,
		marginTop: dimens.regular + 5,
	},
	scheuleTitle: {
		fontFamily: fonts.Poppins.bold,
		color: colors.primaryWhite,
		marginBottom: dimens.regular + 5,
		fontSize: dimens.regular + 4,
	},
	inputStyle: {
		fontFamily: fonts.Poppins.medium,
		width: "100%",
		backgroundColor: colors.lightGray,
		borderRadius: 8,
		color: colors.lightWhite,
		opacity: 0.8,
		paddingVertical: dimens.small + 2,
		paddingHorizontal: dimens.regular,
		marginBottom: dimens.regular,
	},
	scheduleTimeContainer: {
		position: "relative",
		flexDirection: "row",
		justifyContent: "flex-start",
		marginBottom: dimens.large,
	},
	scheduleTimeInput: {
		fontFamily: fonts.Poppins.medium,
		width: dimens.large * 2,
		backgroundColor: colors.lightGray,
		borderRadius: dimens.small + 3,
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
		fontFamily: fonts.Poppins.medium,
		color: colors.opaqueWhite,
	},
	scheduleHalfContainer: {
		flexDirection: "row",
		marginLeft: dimens.regular,
	},
	scheduleHalf: {
		height: dimens.xxLarge,
		width: dimens.xxLarge + 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.lightGray,
		borderRadius: dimens.small + 3,
		marginRight: dimens.regular,
	},
	scheduleHalfText: {
		fontFamily: fonts.Poppins.medium,
		fontSize: fonts.size.medium,
		color: colors.primaryWhite,
	},
	schedulePlusContainer: {
		height: dimens.xxLarge,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		right: 0,
		top: 0,
	},
	scheduleActiveText: {
		fontFamily: fonts.Poppins.medium,
		color: colors.opaqueWhite,
		marginRight: dimens.small,
	},
	scheduleActiveContainer: {
		marginTop: dimens.medium,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
	},

	scheduleDaysContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: dimens.medium,
	},
	scheduleDay: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	scheduleDayDot: {
		height: dimens.medium,
		width: dimens.medium,
		borderRadius: dimens.regular,
		backgroundColor: colors.lightGray,
		marginBottom: dimens.small,
	},
	scheduleDayName: {
		fontFamily: fonts.Poppins.medium,
		color: colors.opaqueWhite,
	},

	scheduleActionsContainer: {
		marginTop: dimens.xxLarge,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
		paddingBottom: dimens.regular + 5,
	},
	scheduleCancel: {
		fontFamily: "Poppins-Bold",
		color: colors.opaqueWhite,
		marginRight: dimens.regular + 5,
	},
	blueButtonContainer: {
		backgroundColor: colors.primaryBlue,
		paddingHorizontal: dimens.regular + 5,
		paddingVertical: dimens.regular,
		borderRadius: dimens.small + 3,
		flexDirection: "row",
		alignSelf: "center",
		justifyContent: "center",
	},
	blueButton: {
		fontFamily: fonts.Poppins.medium,
		color: colors.primaryWhite,
	},

	chatMediaContainer: {
		paddingHorizontal: dimens.medium,
	},
	chatMediaSearchContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	chatFilesLayoutContainer: {
		marginTop: dimens.large,
		flexWrap: "wrap",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
	},
	chatFilesContainer: {
		width: dimens.xxLarge * 2,
		height: dimens.xxLarge * 3,
		marginBottom: dimens.medium,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	chatFilesImageContainer: {
		width: "100%",
		height: dimens.xxLarge * 2,
	},
	chatFileImages: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
		borderRadius: dimens.small + 3,
	},
	chatFilesOtherContainer: {
		width: "100%",
		height: dimens.xxLarge * 2,
		borderRadius: dimens.small + 3,
		borderWidth: dimens.small,
		borderColor: colors.opaqueWhite,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	chatFileExtension: {
		fontFamily: fonts.Poppins.bold,
		color: colors.opaqueWhite,
		fontSize: dimens.medium,
		textTransform: "uppercase",
	},
	chatFileName: {
		fontFamily: fonts.Poppins.medium,
		color: colors.opaqueWhite,
		marginTop: dimens.regular,
		fontSize: fonts.size.small,
		textAlign: "center",
	},

	bottomTabIconContainer: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	selectedTabDot: {
		backgroundColor: colors.primaryRed,
		height: dimens.small,
		width: dimens.small,
		borderRadius: dimens.regular,
		marginBottom: dimens.small,
	},
	bottomTabImageContainer: {
		height: dimens.medium + 5,
		width: dimens.medium + 5,
	},
	bottomTabImage: {
		height: "100%",
		width: "100%",
		borderRadius: dimens.xxLarge,
		resizeMode: "cover",
	},

	medicineStatsContainer: {
		marginTop: dimens.regular,
		paddingHorizontal: dimens.medium,
	},
	medicineGraphContainer: {
		paddingHorizontal: dimens.medium,
		marginTop: dimens.xxLarge,
	},
	lineGraphTitleContainer: {
		width: "100%",
		marginBottom: dimens.medium,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	lineGraphTitleText: {
		fontFamily: fonts.Poppins.medium,
		color: colors.primaryWhite,
	},
	lineGraphDropDownContainer: {
		width: dimens.xxLarge * 4,
	},
	lineGraphDropdown: {
		borderWidth: 0,
		fontFamily: fonts.Poppins.medium,
	},

	medicineListContainer: {
		marginTop: dimens.regular,
		paddingHorizontal: dimens.medium,
	},
	medicineListActions: {
		width: "100%",
		marginTop: dimens.large,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
	},
	medicineLists: {
		minHeight: dimens.xxLarge * 3,
		marginTop: dimens.xLarge + 5,
	},
	medicine: {
		backgroundColor: colors.lightGray,
		paddingVertical: dimens.regular + 2,
		paddingHorizontal: dimens.regular + 5,
		borderRadius: dimens.small + 3,
		marginBottom: dimens.medium,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
	},
	inactiveMedicineStatus: {
		borderLeftWidth: dimens.small,
		borderLeftColor: colors.primaryYellow,
	},
	activeMedicineStatus: {
		borderLeftWidth: dimens.small,
		borderLeftColor: colors.primaryBlue,
	},
	medicineName: {
		fontFamily: fonts.Poppins.medium,
		color: colors.primaryWhite,
	},
	medicineFrequency: {
		marginTop: dimens.small,
		fontFamily: fonts.Poppins.medium,
		color: colors.opaqueWhite,
	},
	medicineFrequencyContainer: {
		marginTop: dimens.medium,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	activeFrequencyText: {
		marginRight: dimens.regular,
		color: colors.primaryWhite,
	},
	inactiveFrequencyTest: {
		marginRight: dimens.regular,
		color: colors.opaqueWhite,
	},
	noMedicineContainer: {
		backgroundColor: colors.lightGray,
		marginTop: dimens.large,
		borderRadius: dimens.small + 3,
		paddingHorizontal: dimens.regular + 5,
		paddingVertical: dimens.regular + 5,
	},
	noDataTitle: {
		fontFamily: fonts.Poppins.semi,
		fontSize: dimens.regular + 5,
		color: colors.primaryWhite,
	},
	noDataText: {
		marginTop: dimens.small,
		fontFamily: fonts.Poppins.regular,
		fontSize: dimens.regular,
		color: colors.opaqueWhite,
	},

	profileContainer: {
		marginTop: dimens.medium,
		paddingHorizontal: dimens.medium,
	},
	profileInfoContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingBottom: dimens.medium * 2,
		marginBottom: dimens.medium * 2,
		borderBottomColor: colors.lightGray,
		borderBottomWidth: 1,
	},
	profileInfoUserContainer: {
		flex: 1,
	},
	profileInfoImageContainer: {
		width: 75,
		height: 75,
		marginRight: dimens.medium,
		position: "relative",
	},
	profileInfoImage: {
		width: "100%",
		height: "100%",
		borderRadius: dimens.xxLarge * 2,
		resizeMode: "cover",
	},
	profileInfoName: {
		color: colors.primaryWhite,
		fontFamily: fonts.Poppins.bold,
		marginBottom: dimens.small,
	},
	profileInfoBio: {
		color: colors.opaqueWhite,
		fontFamily: fonts.Poppins.regular,
		fontSize: fonts.size.small,
		marginBottom: dimens.medium,
	},
	profileInfoFlexContainer: {
		flexDirection: "row",
	},
	profileAdditionalInfo: {
		marginRight: dimens.medium,
		color: colors.opaqueWhite,
		fontFamily: fonts.Poppins.medium,
		fontSize: fonts.size.small,
		marginBottom: dimens.regular,
	},

	profileNavigationContainer: {
		paddingHorizontal: dimens.regular + 5,
		paddingVertical: dimens.regular,
		borderRadius: dimens.small + 3,
		borderWidth: 1,
		borderColor: colors.lightGray,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: dimens.medium,
	},
	profileNavigationIcon: {
		marginRight: dimens.medium,
	},
	profileNavigationTitle: {
		marginBottom: dimens.small,
		fontFamily: fonts.Poppins.bold,
		color: colors.primaryWhite,
	},
	profileNavigationText: {
		fontFamily: fonts.Poppins.medium,
		color: colors.opaqueWhite,
		fontSize: fonts.size.small,
	},
	profileImageFlexContainer: {
		flexDirection: "column",
		alignItems: "center",
		borderRadius: dimens.xxLarge * 2,
	},
	profileActionsContainer: {
		marginTop: dimens.large,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	profileImageCancelContainer: {
		position: "absolute",
		top: dimens.regular,
		right: -dimens.regular,
		zIndex: 99,
	},

	settingsContainer: {
		paddingHorizontal: dimens.medium,
		marginTop: dimens.large,
	},
	profileSettingsFlexContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	accountInfoTitle: {
		fontFamily: fonts.Poppins.bold,
		color: colors.primaryWhite,
		marginBottom: dimens.regular,
	},
	accountInfoText: {
		fontFamily: fonts.Poppins.regular,
		color: colors.opaqueWhite,
		fontSize: fonts.size.small - 1,
	},
	whiteTextButton: {
		marginTop: dimens.small,
		fontFamily: fonts.Poppins.medium,
		color: colors.primaryWhite,
	},
	redTextButton: {
		fontFamily: fonts.Poppins.bold,
		color: colors.primaryRed,
	},

	loginFlexContainer: {
		height: "100%",
		paddingHorizontal: dimens.medium,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	loginContainer: {
		width: "100%",
	},

	logOutContainer: {
		marginTop: dimens.medium * 2,
		paddingTop: dimens.medium * 2,
		borderTopColor: colors.lightGray,
		borderTopWidth: 1,
	},
	loginTitle: {
		fontFamily: fonts.Poppins.bold,
		color: colors.primaryWhite,
		marginBottom: dimens.large,
	},
	loginNavigationText: {
		fontFamily: fonts.Poppins.regular,
		color: colors.opaqueWhite,
		fontSize: fonts.size.small,
		marginTop: dimens.regular,
	},
	loginCTAContainer: {
		marginTop: dimens.large,
		width: "100%",
	},

	registerStepContainer: {
		marginTop: dimens.large,
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
		fontFamily: fonts.Poppins.medium,
		color: colors.opaqueWhite,
	},

	errorContainer: {
		marginBottom: dimens.medium,
		borderWidth: 1,
		borderRadius: dimens.small + 3,
		borderColor: colors.primaryRed,
		paddingHorizontal: dimens.regular,
		paddingVertical: dimens.regular,
	},

	errorText: {
		fontFamily: fonts.Poppins.regular,
		color: colors.primaryRed,
	},

	modalContainer: {
		flex: 0.8,
		justifyContent: "center",
		alignItems: "center",
	},
	modalImagePreview: {
		flex: 0.8,
		height: "100%",
		width: "100%",
		maxHeight: "100%",
		maxWidth: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	modalImage: {
		height: "100%",
		width: "100%",
		resizeMode: "contain",
	},
	modalMediaInformationContainer: {
		width: "100%",
		marginBottom: dimens.regular,
	},
	modalText: {
		fontFamily: fonts.Poppins.medium,
		color: colors.primaryWhite,
		fontSize: fonts.size.regular,
		textAlign: "center",
	},

	chatModalOuterContainer: {
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "center",
		padding: dimens.medium,
	},
	chatModalContainer: {
		borderRadius: dimens.small,
		backgroundColor: colors.lightGray,
		width: "100%",
		padding: dimens.medium,
	},
	chatModalTitle: {
		color: colors.primaryWhite,
		fontSize: fonts.size.medium,
		fontFamily: fonts.Poppins.medium,
	},
	chatModalListsContainer: {
		marginTop: dimens.medium,
	},
	chatModalMessageWith: {
		fontSize: fonts.size.small,
		fontFamily: fonts.Poppins.regular,
		color: colors.primaryWhite,
	},

	messageRequestContainer: {
		paddingHorizontal: dimens.medium,
	},
	doctorTitle: {
		fontFamily: fonts.Poppins.regular,
		color: colors.opaqueWhite,
		fontSize: fonts.size.small,
	},

	requestIndicatorTextContainer: {
		backgroundColor: colors.primaryRed,
		height: dimens.small,
		width: dimens.small,
		borderRadius: dimens.small / 2,
		alignItems: "center",
		justifyContent: "center",
		marginLeft: dimens.small,
	},

	rowStartContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: dimens.regular,
	},
	allCenteredContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	spacedApartContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	outlineYellowButtonContainer: {
		paddingVertical: dimens.regular,
		paddingHorizontal: dimens.regular + 5,
		borderWidth: 1,
		borderRadius: dimens.small + 3,
		borderColor: colors.primaryYellow,
	},
	outlineYellowButton: {
		fontFamily: fonts.Poppins.regular,
		color: colors.primaryYellow,
	},

	yellowButtonContainer: {
		backgroundColor: colors.primaryYellow,
		paddingHorizontal: dimens.regular + 5,
		paddingVertical: dimens.regular,
		borderRadius: dimens.small + 3,
		flexDirection: "row",
		alignSelf: "center",
		justifyContent: "center",
	},
	yellowButton: {
		fontFamily: fonts.Poppins.medium,
		color: colors.primaryGray,
	},

	stripCalendar: {
		height: dimens.xxLarge * 2.5,
		paddingTop: dimens.regular,
		paddingBottom: dimens.small,
	},
	stripCalendarHeader: {
		marginBottom: dimens.medium,
		color: colors.opaqueWhite,
	},
	stripCalendarDateNumber: {
		color: colors.primaryWhite,
	},
	stripCalendarDateName: {
		color: colors.opaqueWhite,
	},
	stripCalendarIconStyle: {
		display: "none",
	},

	highlightDateNumberStyle: {
		color: colors.primaryWhite,
	},
	highlightDateNameStyle: {
		color: colors.primaryWhite,
	},
	highlightDateContainerStyle: {
		backgroundColor: colors.primaryBlue,
		width: dimens.xLarge + dimens.regular,
		height: dimens.xLarge + dimens.regular,
		borderRadius: dimens.xLarge,
	},

	intakeContainer: {
		marginTop: dimens.large,
		paddingHorizontal: dimens.medium,
	},
	intakeEntryTime: {
		color: colors.primaryWhite,
		fontFamily: fonts.Poppins.regular,
		fontSize: fonts.size.large,
	},
	intakeEntryContainer: {
		borderRadius: dimens.regular,
		borderWidth: 2,
		paddingHorizontal: dimens.regular,
		paddingVertical: dimens.regular,
		borderColor: colors.lightGray,
	},
	intakeName: {
		color: colors.primaryWhite,
		fontFamily: fonts.Poppins.regular,
		fontSize: fonts.size.regular,
	},
	intakeStatus: {
		color: colors.opaqueWhite,
		fontFamily: fonts.Poppins.regular,
		fontSize: fonts.size.regular,
		marginTop: dimens.small,
	},
	unlistedIntakeStatus: {
		color: colors.opaqueWhite,
	},
	takenIntakeStatus: {
		color: colors.primaryGreen,
	},
	skippedIntakeStatus: {
		color: colors.primaryRed,
	},

	hospitalListContainer: {
		paddingHorizontal: dimens.regular,
		height: "50%",
	},
	hospitalCategoryTitle: {
		fontFamily: fonts.Poppins.bold,
		fontSize: fonts.size.large,
		color: colors.opaqueWhite,
	},
	hospitalCategoryDescription: {
		fontFamily: fonts.Poppins.regular,
		fontSize: fonts.size.small,
		color: colors.opaqueWhite,
		marginBottom: dimens.large,
	},
	hospitalCategoryEntryContainer: {
		padding: dimens.small,
		borderWidth: 1,
		borderColor: colors.opaqueWhite,
		borderRadius: dimens.small,
		marginBottom: dimens.medium,
	},
	hospitalCategoryEntryText: {
		fontFamily: fonts.Poppins.regular,
		fontSize: fonts.size.regular,
		color: colors.primaryWhite,
	},
	selectedHospitalContainer: {
		backgroundColor: colors.primaryBlue,
		borderColor: colors.primaryBlue,
	},

	hospitalHamburgerContainer: {
		zIndex: 999,
		position: "absolute",
		top: dimens.regular,
		right: dimens.regular,
		padding: dimens.small,
		backgroundColor: colors.primaryBlue,
		borderRadius: dimens.small,
	},
});

export default styles;
