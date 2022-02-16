import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useSelector } from "react-redux";
import { MedicineType } from "../../Redux/Actions/UserActionTypes";
import { RootStore } from "../../Redux/store";
import { colors } from "../../Styles/Colors";

const MedicineListSkeleton = () => {
	const { user } = useSelector((state: RootStore) => state.userReducer);

	return (
		<View style={{ marginTop: 40 }}>
			{user.medicines.map((medicine: MedicineType, index: number) => (
				<View key={index}>
					<SkeletonPlaceholder
						backgroundColor={colors.lightGray}
						highlightColor={colors.primaryGray}
					>
						<SkeletonPlaceholder.Item
							flexDirection="row"
							alignItems="flex-start"
							justifyContent="space-between"
							paddingHorizontal={15}
							paddingVertical={12}
						>
							<SkeletonPlaceholder.Item>
								<SkeletonPlaceholder.Item
									width={100}
									height={20}
								/>

								<SkeletonPlaceholder.Item
									marginTop={10}
									width={200}
									height={15}
								/>

								<SkeletonPlaceholder.Item
									marginTop={30}
									width={150}
									height={15}
								/>
							</SkeletonPlaceholder.Item>

							<SkeletonPlaceholder.Item width={20} height={20} />
						</SkeletonPlaceholder.Item>
					</SkeletonPlaceholder>
				</View>
			))}
		</View>
	);
};

export default MedicineListSkeleton;
