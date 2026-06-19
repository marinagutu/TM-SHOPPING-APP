import { Tabs } from "expo-router";
import BasketIcon from "../../components/common/Icons/BasketIcon";
import HomeIcon from "../../components/common/Icons/HomeIcon";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: HomeIcon,
        }}
      />
      <Tabs.Screen
        name="(basket)"
        options={{
          title: "Basket",
          tabBarIcon: BasketIcon,
        }}
      />
    </Tabs>
  );
}
