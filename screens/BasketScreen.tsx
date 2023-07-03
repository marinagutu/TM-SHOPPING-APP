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
import { COLORS } from "../constants";
import ButtonComponent from "../components/common/ButtonComponent";
import useCart from "../hooks/useCart";
import { Product } from "./ProductsScreen";
import { useEffect, useState } from "react";

const BasketScreen = () => {
  const { cartItems, removeFromCart } = useCart();
  const [totalItems, setTotalItems] = useState<number>();
  const [totalPrice, setTotalPrice] = useState<number>();

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
          <View style={style.deleteContainer}>
            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
              <Image
                source={require("../assets/icon_delete.png")}
                style={style.iconDelete}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={style.textContainer}>
          <View style={{ flex: 1, alignContent: "center" }}>
            <Text style={style.textTitle}>{item.title}</Text>
            <Text style={style.description}>{item.brand}</Text>
            <Text style={style.description}>Quantity: {item?.quantity}</Text>
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
    backgroundColor: "black",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
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
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
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
    marginHorizontal: 20,
    fontWeight: "600",
    marginTop: 5,
    fontSize: 20,
    color: COLORS.white,
  },
  description: {
    marginHorizontal: 20,
    marginBottom: 10,
    color: COLORS.white,
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
