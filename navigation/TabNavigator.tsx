import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import BasketScreen from "../screens/BasketScreen";
import Icon from "../components/common/Icon";
import { StyleSheet } from "react-native";
import { Product } from "../screens/ProductsScreen";
import ProductsScreen from "../screens/ProductsScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";

export type TabStackPramsList = {
  Home: undefined;
  Basket: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  ProductsScreen: { category: string };
  ProductDetailsScreen: { product: Product };
};

const Tab = createBottomTabNavigator<TabStackPramsList>();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: " " }}
      />
      <Stack.Screen
        name="ProductsScreen"
        component={ProductsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
        options={{
          title: " ",

          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const HomeIcon = () => (
  <Icon source={require("../assets/icon_home.png")} style={style.icon} />
);

const BasketIcon = () => (
  <Icon source={require("../assets/icon_shopping.png")} style={style.icon} />
);

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Basket"
        component={BasketScreen}
        options={{
          tabBarIcon: BasketIcon,
        }}
      />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default TabNavigator;
