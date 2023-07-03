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
import QuantityButton from "../components/common/QuantityButton";

const BasketScreen = () => {
  const { cartItems, removeFromCart } = useCart();
  const [totalItems, setTotalItems] = useState<number>();
  const [totalPrice, setTotalPrice] = useState<number>();
  const navigation = useNavigation();

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
      <View style={style.container}>
        <ImageBackground
          source={{ uri: item.thumbnail }}
          style={style.imageBackground}
        >
          <View
            style={{
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <TouchableOpacity
              style={style.deleteContainer}
              onPress={() => removeFromCart(item.id)}
            >
              <Image
                source={require("../assets/icon_delete.png")}
                style={style.iconDelete}
              />
            </TouchableOpacity>
            <View>
              <QuantityButton styles={{ marginBottom: 10, marginLeft: 10 }} />
            </View>
          </View>
        </ImageBackground>
        <View style={style.textContainer}>
          <View style={{ flex: 1, alignContent: "center" }}>
            <Text style={style.textTitle}>{item.title}</Text>
            <Text style={style.description}>{item.brand}</Text>
          </View>
          <Text style={style.price}>${item.price}</Text>
        </View>
      </View>
    );
  };

  if (!cartItems?.length)
    return (
      <SafeAreaView
        style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text>Your shopping cart is empty!</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={style.safeArea}>
      <Text style={style.title}>My Cart</Text>
      <FlatList data={cartItems} renderItem={renderItem} />

      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
        }}
      >
        <Text style={style.textTotal}>
          {totalItems ? `Products : ${totalItems}` : ""}
        </Text>
        <Text style={style.textPrice}>
          {totalPrice ? `Total: $${totalPrice}` : ""}{" "}
        </Text>
      </View>

      <ButtonComponent
        title="Proceed to Checkout"
        trailingIcon={require("../assets/icon_back.png")}
        style={{ marginHorizontal: 20, marginVertical: 10 }}
        iconStyle={{
          transform: [
            {
              rotate: "180deg",
            },
          ],
        }}
        action={() => navigation.navigate("CheckoutScreen")}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  deleteContainer: {
    backgroundColor: COLORS.black,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignSelf: "flex-end",
    marginRight: 10,
    marginTop: 10,
  },
  imageBackground: {
    height: 150,
    overflow: "hidden",
    backgroundColor: "blue",
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
    marginHorizontal: 20,
    paddingBottom: 20,
    fontWeight: "400",
    fontSize: 24,
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
});

export default BasketScreen;
