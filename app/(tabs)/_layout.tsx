import { Tabs } from "expo-router";
import BasketIcon from "../../components/common/Icons/BasketIcon";
import HomeIcon from "../../components/common/Icons/HomeIcon";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: HomeIcon,
        }}
      />
      <Tabs.Screen
        name="basket"
        options={{
          title: "Basket",
          tabBarIcon: BasketIcon,
        }}
      />
      <Tabs.Screen name="products/[category]" options={{ href: null }} />
      <Tabs.Screen name="product-details" options={{ href: null }} />
      <Tabs.Screen name="contact" options={{ href: null }} />
      <Tabs.Screen name="checkout" options={{ href: null }} />
    </Tabs>
  );
}
