import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { applicationReducer } from "./Reducers/ApplicationReducer";
import { userReducer } from "./Reducers/UserReducer";

const rootReducer = combineReducers({
	userReducer: userReducer,
	applicationReducer: applicationReducer,
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));

export type RootStore = ReturnType<typeof rootReducer>;
