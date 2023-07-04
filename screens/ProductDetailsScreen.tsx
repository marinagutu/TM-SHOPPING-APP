import {
  SafeAreaView,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Image, Text } from "react-native";
import { COLORS, STYLES } from "../constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { HomeStackParamList } from "../navigation/TabNavigator";
import QuantityButton from "../components/common/QuantityButton";
import Field from "../components/common/Field";
import ButtonComponent from "../components/common/ButtonComponent";
import Toast from "react-native-toast-message";
import useCart from "../hooks/useCart";
import BackIcon from "../components/common/BackIcon";

const ProductDetailsScreen = () => {
  type ProductScreenProps = RouteProp<
    HomeStackParamList,
    "ProductDetailsScreen"
  >;
  const params = useRoute<ProductScreenProps>().params;
  const product = params?.product;
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();

  function updateQuantity(change: number) {
    // Calculate the new quantity based on the change
    const newQuantity = quantity + change;
    // Check if the new quantity is within the allowed range
    if (newQuantity >= 1 && newQuantity <= parseInt(product.stock)) {
      setQuantity(newQuantity); // Update the quantity
    } else if (newQuantity < 1) {
      setQuantity(1); // Set the quantity to the minimum (1)
    } else if (newQuantity > parseInt(product.stock)) {
      setQuantity(parseInt(product?.stock)); // Set the quantity to the maximum (product.stock)
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        resizeMode="stretch"
        source={{ uri: product?.thumbnail }}
        style={{ flex: 0.4 }}
      >
        <BackIcon
          hasBackground
          containerStyle={{ marginLeft: 15, marginTop: 15 }}
          action={goBack}
        />
      </ImageBackground>
      <View style={styles.detailsCard}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View id="first">
            <Field
              title={product?.title}
              description={product?.category}
              titleStyle={{ width: "85%" }}
            />
            <View style={styles.reviewsWrapper}>
              <Image
                source={require("../assets/icon_rating.png")}
                style={styles.ratingIcon}
              />
              <Text>{product?.rating} (Reviews Score)</Text>
            </View>
          </View>
          <View id="second" style={{ marginRight: 0 }}>
            <QuantityButton
              leftAction={() => updateQuantity(-1)}
              rightAction={() => updateQuantity(+1)}
              quantity={quantity}
              styles={styles.quantityButton}
            />
            <Text style={styles.stockText}>Available in stock</Text>
          </View>
        </View>
        <Field title="Brand" description={product?.brand} />
        <Field
          title="Description"
          description={product?.description}
          descriptionStyle={{ marginTop: 5 }}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Field
            title={"Total Price"}
            titleStyle={STYLES.textSecondary}
            description={`$${product?.price}`}
            descriptionStyle={STYLES.textPrimary}
          />
          <ButtonComponent
            action={() => addToCart(product, quantity)}
            title="Add to cart"
            style={styles.cartButton}
            frontIcon={require("../assets/icon_shopping.png")}
          />
        </View>
      </View>
      <Toast position="bottom" bottomOffset={20}></Toast>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    ...STYLES.mainScreen,
  },
  backIcon: {
    tintColor: "white",
    height: 20,
    width: 20,
  },
  iconWrapper: {
    backgroundColor: COLORS.black,
    height: 35,
    width: 35,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButton: {
    marginLeft: 27,
  },
  ratingIcon: {
    width: 35,
    height: 35,
    tintColor: "orange",
    marginRight: 10,
  },
  reviewsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  stockText: {
    fontWeight: "700",
    marginTop: 22,
  },
  detailsCard: {
    flex: 0.7,
    backgroundColor: COLORS.white,
    marginTop: -20,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cartButton: { width: 150, borderRadius: 20, marginTop: 20 },
});

export default ProductDetailsScreen;
