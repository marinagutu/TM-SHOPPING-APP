import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";

export type RootStackParamList = {
  RootNavigator: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    // <RootStack.Navigator screenOptions={{ headerShown: false }}>

    <RootStack.Navigator screenOptions={{ headerShown: true }}>
      <RootStack.Screen name="RootNavigator" component={TabNavigator} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
