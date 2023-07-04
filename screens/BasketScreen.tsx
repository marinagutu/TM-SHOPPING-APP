import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { COLORS, STYLES } from "../constants";
import ButtonComponent from "../components/common/ButtonComponent";
import useCart from "../hooks/useCart";
import { Product } from "./ProductsScreen";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import QuantityButton from "../components/common/QuantityButton";
import { BasketStackParamList } from "../navigation/TabNavigator";
import BackIcon from "../components/common/Icons/BackIcon";

const BasketScreen = () => {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const [totalItems, setTotalItems] = useState<number>();
  const [totalPrice, setTotalPrice] = useState<number>();
  const navigation =
    useNavigation<NativeStackNavigationProp<BasketStackParamList>>();

  const getTotals = () => {
    let price: number = 0;
    let itemQuantities: number = 0;
    cartItems?.forEach((item) => {
      price = price + item.price * item.quantity!;
      itemQuantities = itemQuantities + item?.quantity!;
    });

    setTotalPrice(price);
    setTotalItems(itemQuantities);
  };

  useEffect(() => {
    getTotals();
  }, [cartItems]);

  const renderItem = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductDetailsScreen", {
            product: item,
          })
        }
        style={styles.container}
      >
        <ImageBackground
          source={{ uri: item.thumbnail }}
          style={styles.imageBackground}
        >
          <View
            style={{
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <TouchableOpacity
              style={styles.deleteContainer}
              onPress={() => removeFromCart(item.id)}
            >
              <Image
                source={require("../assets/icon_delete.png")}
                style={styles.iconDelete}
              />
            </TouchableOpacity>
            <View>
              <QuantityButton
                quantity={item.quantity}
                rightAction={() => addToCart(item, 1)}
                leftAction={() => removeFromCart(item.id)}
                styles={styles.quantityButton}
              />
            </View>
          </View>
        </ImageBackground>
        <View style={styles.textContainer}>
          <View style={{ flex: 1, alignContent: "center" }}>
            <Text style={styles.textTitle}>{item.title}</Text>
            <Text style={styles.description}>{item.brand}</Text>
          </View>
          <Text style={styles.price}>${item.price}</Text>
          <Text
            style={{
              ...styles.textTitle,
              alignSelf: "flex-start",
              marginRight: 10,
              fontWeight: "800",
            }}
          >
            ${item.price * item.quantity!}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (!cartItems?.length)
    return (
      <SafeAreaView style={styles.emptySafeArea}>
        <Text>Your shopping cart is empty!</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackIcon
        action={() => navigation.navigate("HomeScreen")}
        hasBackground
        containerStyle={{ marginLeft: 20, marginTop: 10 }}
      />
      <Text style={styles.title}>My Cart</Text>
      <FlatList data={cartItems} renderItem={renderItem} />

      <View style={styles.totalPricesFlex}>
        <Text style={styles.textTotal}>
          {totalItems ? `Products : ${totalItems}` : ""}
        </Text>
        <Text style={styles.textPrice}>
          {totalPrice ? `Total: $${totalPrice}` : ""}{" "}
        </Text>
      </View>

      <ButtonComponent
        title="Proceed to Checkout"
        trailingIcon={require("../assets/icon_back.png")}
        style={styles.checkoutButton}
        iconStyle={{
          transform: [
            {
              rotate: "180deg",
            },
          ],
        }}
        action={() => navigation.navigate("ContactScreen")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    ...STYLES.mainScreen,
  },
  emptySafeArea: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  container: {
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  checkoutButton: { marginHorizontal: 20, marginVertical: 10 },
  quantityButton: { marginBottom: 10, marginLeft: 10 },
  deleteContainer: {
    backgroundColor: COLORS.black,
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignSelf: "flex-end",
    marginRight: 10,
    marginTop: 10,
  },
  imageBackground: {
    height: 100,
    overflow: "hidden",
    borderRadius: 10,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconDelete: {
    width: 20,
    height: 20,
    tintColor: COLORS.white,
    alignSelf: "center",
  },
  title: {
    ...STYLES.textPrimary,
    marginLeft: 20,
    marginVertical: 10,
  },
  textTitle: {
    fontWeight: "600",
    marginTop: 5,
    fontSize: 20,
    color: COLORS.black,
  },
  description: {
    marginBottom: 10,
    ...STYLES.textSecondary,
  },
  price: {
    fontSize: 20,
    marginRight: 20,
    fontWeight: "800",
    color: COLORS.white,
  },
  textTotal: {
    marginHorizontal: 20,
    fontSize: 16,
    color: COLORS.graySecondary,
    fontWeight: "600",
    flex: 1,
  },
  textPrice: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  totalPricesFlex: { flexDirection: "row", marginVertical: 10 },
});

export default BasketScreen;
