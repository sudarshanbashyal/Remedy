import React, { useEffect } from "react";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import { Store } from "./Redux/store";
import StackRenderer from "./StackRenderer";
import "react-native-gesture-handler";

const App = () => {
	useEffect(() => {
		LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
	}, []);

	return (
		<Provider store={Store}>
			<StackRenderer />
		</Provider>
	);
};

export default App;
