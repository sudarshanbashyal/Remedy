export const CHANGE_CURRENT_NAVIGATION = "CHANGE_CURRENT_NAVIGATION";

export interface DefaultApplicationStateType {
	currentNavigation: string;
}

export interface ChangeNavigation {
	type: typeof CHANGE_CURRENT_NAVIGATION;
	payload: string;
}

export type ApplicationDispatchType = ChangeNavigation;
