import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { STYLES, COLORS } from "../constants";
import Field from "../components/common/Field";
import { Product } from "./ProductsScreen";
import BackIcon from "../components/common/Icons/BackIcon";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import useCart from "../hooks/useCart";
import { BasketStackParamList } from "../navigation/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ButtonComponent from "../components/common/ButtonComponent";
import CustomModal from "../components/common/CustomModal";
import { useEffect, useState } from "react";

const CheckoutScreen = () => {
  type CheckoutScreenProps = RouteProp<BasketStackParamList, "CheckoutScreen">;
  const params = useRoute<CheckoutScreenProps>().params;
  const { cartItems, clearCart } = useCart();
  const [open, setIsOpen] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>();

  const submitOrder = () => {
    clearCart();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    navigation.navigate("BasketScreen");
  };

  const getTotals = () => {
    let price: number = 0;

    cartItems?.forEach((item) => {
      if (item.quantity) {
        price = price + item.price * item.quantity;
      }
    });

    setTotalPrice(price);
  };

  useEffect(() => {
    getTotals();
  }, [cartItems]);

  const navigation =
    useNavigation<NativeStackNavigationProp<BasketStackParamList>>();

  const renderItem = ({ item }: { item: Product }) => {
    return (
      <View style={styles.productCard}>
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        <View>
          <Text style={styles.textTitle}>{item.title}</Text>
          <Text style={styles.textDescription} numberOfLines={2}>
            {item.brand}
          </Text>
          <Text style={styles.textTitle}>${item.price}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackIcon
        hasBackground
        containerStyle={{ marginLeft: 0, marginTop: 10, marginBottom: 10 }}
        action={() => navigation.goBack()}
      />
      <Text style={styles.title}>Delivery Address</Text>
      <View style={styles.addressCard}>
        <Text>
          Full Name: <Text style={styles.highlight}>{params.name}</Text>
        </Text>
        <Text>
          Phone Number: <Text style={styles.highlight}>{params.phone}</Text>
        </Text>
        <Text>
          Email: <Text style={styles.highlight}>{params.email}</Text>
        </Text>
        <Text>
          City : <Text style={styles.highlight}>{params.city}</Text>
        </Text>
        <Text>
          Address : <Text style={styles.highlight}>{params.address}</Text>
        </Text>
      </View>
      <FlatList
        data={cartItems}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Field
          title={"Total Price"}
          titleStyle={STYLES.textSecondary}
          description={`$${totalPrice}`}
          descriptionStyle={STYLES.textPrimary}
        />
        <ButtonComponent
          title="Place Order"
          action={submitOrder}
          style={styles.orderButton}
        ></ButtonComponent>
      </View>
      <CustomModal visible={open} onClose={closeModal} buttonTitle="Go Back">
        <View>
          <Text>Your Order has been sent</Text>
        </View>
      </CustomModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    ...STYLES.mainScreen,
    backgroundColor: COLORS.grayLight,
    paddingHorizontal: 15,
  },
  title: {
    ...STYLES.textPrimary,
  },
  addressCard: {
    marginVertical: 5,
    paddingLeft: 10,
    paddingVertical: 20,
    gap: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: "100%",
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
  textTitle: {
    ...STYLES.textPrimary,
  },
  highlight: {
    fontWeight: "bold",
  },
  textDescription: {
    ...STYLES.textSecondary,
  },
  orderButton: { borderRadius: 20, width: "50%", alignSelf: "center" },
});

export default CheckoutScreen;
