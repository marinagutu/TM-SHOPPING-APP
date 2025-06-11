import { StatusBar, View } from "react-native";
import RootNavigator from "./navigation/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
        <RootNavigator />
      </View>
    </NavigationContainer>
  );
}
