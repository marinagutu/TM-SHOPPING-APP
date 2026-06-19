import { SafeAreaView, View, StyleSheet, ScrollView } from "react-native";
import { Image, Text } from "react-native";
import { COLORS, STYLES } from "../constants";
import { useState } from "react";
import QuantityButton from "../components/common/QuantityButton";
import ButtonComponent from "../components/common/ButtonComponent";
import Toast from "react-native-toast-message";
import useCart from "../hooks/useCart";
import BackIcon from "../components/common/Icons/BackIcon";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Product } from "./ProductsScreen";

const ProductDetailsScreen = () => {
  const { product: productParam } = useLocalSearchParams<{
    product?: string;
  }>();
  const product = JSON.parse(productParam ?? "{}") as Product;
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();

  function updateQuantity(change: number) {
    // Calculate the new quantity based on the change
    const newQuantity = quantity + change;
    // Check if the new quantity is within the allowed range
    if (!product) return;

    if (newQuantity >= 1 && newQuantity <= parseInt(product.stock)) {
      setQuantity(newQuantity); // Update the quantity
    } else if (newQuantity < 1) {
      setQuantity(1); // Set the quantity to the minimum (1)
    } else if (newQuantity > parseInt(product.stock)) {
      setQuantity(parseInt(product.stock)); // Set the quantity to the maximum (product.stock)
    }
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.emptySafeArea}>
        <BackIcon hasBackground containerStyle={{}} action={goBack} />
        <Text>Product details are unavailable.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.imageSection}>
        <BackIcon
          hasBackground
          containerStyle={styles.backButton}
          action={goBack}
        />
        <Image source={{ uri: product.thumbnail }} style={styles.heroImage} />
      </View>

      <ScrollView
        style={styles.detailsCard}
        contentContainerStyle={styles.detailsContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleRow}>
          <View style={styles.titleBlock}>
            <Text style={styles.categoryText}>{product.category}</Text>
            <Text style={styles.title}>{product.title}</Text>
          </View>
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>${product.price}</Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaPill}>
            <Text style={styles.metaLabel}>Brand</Text>
            <Text style={styles.metaValue}>{product.brand}</Text>
          </View>
          <View style={styles.metaPill}>
            <Text style={styles.metaLabel}>Rating</Text>
            <View style={styles.ratingRow}>
              <Image
                source={require("../assets/icon_rating.png")}
                style={styles.ratingIcon}
              />
              <Text style={styles.metaValue}>{product.rating}</Text>
            </View>
          </View>
        </View>

        <View style={styles.descriptionCard}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <View style={styles.actionCard}>
          <View>
            <Text style={styles.stockText}>Available in stock</Text>
            <Text style={styles.stockCount}>{product.stock} items</Text>
          </View>
          <QuantityButton
            leftAction={() => updateQuantity(-1)}
            rightAction={() => updateQuantity(+1)}
            quantity={quantity}
          />
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={styles.totalLabel}>Total Price</Text>
            <Text style={styles.totalPrice}>${product.price * quantity}</Text>
          </View>
          <ButtonComponent
            action={() => addToCart(product, quantity)}
            title="Add to cart"
            style={styles.cartButton}
            frontIcon={require("../assets/icon_shopping.png")}
          />
        </View>
      </ScrollView>
      <Toast position="bottom" bottomOffset={20}></Toast>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    ...STYLES.mainScreen,
    backgroundColor: "#F7F8FA",
  },
  emptySafeArea: {
    alignItems: "center",
    flex: 1,
    gap: 20,
    justifyContent: "center",
  },
  imageSection: {
    backgroundColor: "#F1F2F5",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    minHeight: 330,
    overflow: "hidden",
    paddingHorizontal: 18,
    paddingTop: 14,
  },

  backButton: {
    marginBottom: 8,
  },

  heroImage: {
    alignSelf: "center",
    flex: 1,
    minHeight: 260,
    resizeMode: "contain",
    width: "100%",
  },

  ratingIcon: {
    width: 18,
    height: 18,
    tintColor: "#E8B44C",
    marginRight: 5,
  },

  ratingRow: {
    alignItems: "center",
    flexDirection: "row",
  },

  titleRow: {
    flexDirection: "row",
    gap: 14,
    justifyContent: "space-between",
  },

  titleBlock: {
    flex: 1,
  },

  categoryText: {
    color: "#B7791F",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0,
    marginBottom: 6,
    textTransform: "uppercase",
  },

  title: {
    color: COLORS.black,
    fontSize: 25,
    fontWeight: "900",
    lineHeight: 31,
  },

  priceBadge: {
    alignItems: "center",
    backgroundColor: COLORS.black,
    borderRadius: 18,
    justifyContent: "center",
    minWidth: 86,
    paddingHorizontal: 14,
    paddingVertical: 10,
    height: 54,
  },

  priceText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "900",
  },

  metaRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },

  metaPill: {
    backgroundColor: "#F6F7FB",
    borderRadius: 18,
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  metaLabel: {
    color: COLORS.graySecondary,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 5,
  },

  metaValue: {
    color: COLORS.black,
    fontSize: 15,
    fontWeight: "800",
    textTransform: "capitalize",
  },

  descriptionCard: {
    marginTop: 22,
  },

  sectionTitle: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 8,
  },

  description: {
    color: COLORS.grayPrimary,
    fontSize: 15,
    lineHeight: 22,
  },

  stockText: {
    color: COLORS.black,
    fontSize: 15,
    fontWeight: "900",
  },

  stockCount: {
    color: COLORS.graySecondary,
    fontSize: 13,
    fontWeight: "600",
    marginTop: 4,
  },

  actionCard: {
    alignItems: "center",
    backgroundColor: "#F6F7FB",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  detailsCard: {
    backgroundColor: COLORS.white,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    flex: 1,
    marginTop: -28,
  },

  detailsContent: {
    paddingBottom: 30,
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },

  totalLabel: {
    color: COLORS.graySecondary,
    fontSize: 13,
    fontWeight: "700",
  },

  totalPrice: {
    color: COLORS.black,
    fontSize: 24,
    fontWeight: "900",
    marginTop: 3,
  },

  cartButton: { width: 165, borderRadius: 22 },
});

export default ProductDetailsScreen;
