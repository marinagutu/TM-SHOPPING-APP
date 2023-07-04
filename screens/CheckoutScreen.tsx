import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { STYLES, COLORS } from "../constants";
import { Product } from "./ProductsScreen";
import BackIcon from "../components/common/BackIcon";
import useCart from "../hooks/useCart";

const CheckoutScreen = () => {
  const { cartItems } = useCart();

  const renderItem = ({ item }: { item: Product }) => {
    return (
      <View style={styles.productCard}>
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        <View>
          <Text>Blabla</Text>
          <Text>Blabla</Text>
          <Text>Blabla</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackIcon
        hasBackground
        containerStyle={{ marginLeft: 10, marginTop: 10 }}
      />
      <Text style={styles.title}>Delivery Address</Text>
      <FlatList data={cartItems} renderItem={renderItem} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    ...STYLES.mainScreen,
    backgroundColor: COLORS.grayLight,
    padding: 20,
  },
  title: {
    ...STYLES.textPrimary,
  },
  productCard: {
    height: 80,
    marginVertical: 5,
    flexDirection: "row",
    paddingLeft: 10,
    gap: 10,
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: "100%",
  },
  thumbnail: {
    height: 50,
    borderRadius: 10,
    width: 50,
  },
});

export default CheckoutScreen;
