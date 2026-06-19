import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLORS, STYLES } from "../constants";
import ButtonComponent from "../components/common/ButtonComponent";
import useCart from "../hooks/useCart";
import { Product } from "./ProductsScreen";
import { useEffect, useState } from "react";
import QuantityButton from "../components/common/QuantityButton";
import BackIcon from "../components/common/Icons/BackIcon";
import DeleteIcon from "../components/common/Icons/DeleteIcon";
import { useRouter } from "expo-router";

const BasketScreen = () => {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const [totalItems, setTotalItems] = useState<number>();
  const [totalPrice, setTotalPrice] = useState<number>();
  const router = useRouter();

  const getTotals = () => {
    let price: number = 0;
    let itemQuantities: number = 0;
    cartItems?.forEach((item) => {
      if (item.quantity) {
        price = price + item.price * item.quantity;
        itemQuantities = itemQuantities + item?.quantity;
      }
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
        activeOpacity={0.85}
        onPress={() =>
          router.push({
            pathname: "/product-details",
            params: { product: JSON.stringify(item) },
          })
        }
        style={styles.productContainer}
      >
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
        </View>
        <View style={styles.itemDetails}>
          <View style={styles.itemTopRow}>
            <View style={styles.itemTitleBlock}>
              <Text style={styles.textTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.description} numberOfLines={1}>
                {item.brand}
              </Text>
            </View>
            <DeleteIcon
              action={() => removeFromCart(item.id, item.quantity)}
              hasBackground
              containerStyle={styles.deleteIcon}
            />
          </View>
          <View style={styles.itemBottomRow}>
            <View>
              <Text style={styles.priceLabel}>Item price</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
            <QuantityButton
              quantity={item.quantity}
              rightAction={() => addToCart(item, 1)}
              leftAction={() => removeFromCart(item.id)}
              styles={styles.quantityButton}
            />
          </View>
          <View style={styles.lineTotal}>
            <Text style={styles.lineTotalLabel}>Subtotal</Text>
            <Text style={styles.lineTotalPrice}>
              ${item.price * item.quantity!}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (!cartItems?.length)
    return (
      <SafeAreaView style={styles.emptySafeArea}>
        <View style={styles.emptyIcon}>
          <Image
            source={require("../assets/icon_cart.png")}
            style={styles.emptyCartIcon}
          />
        </View>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtitle}>Add products to see them here.</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <BackIcon
          action={() => router.back()}
          hasBackground
          containerStyle={{}}
        />
        <View>
          <Text style={styles.kicker}>Shopping cart</Text>
          <Text style={styles.title}>My Cart</Text>
        </View>
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.textTotal}>Products</Text>
          <Text style={styles.summaryValue}>{totalItems ?? 0}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.textPrice}>${totalPrice?.toFixed(2) ?? 0}</Text>
        </View>

        <ButtonComponent
          title="Proceed to Checkout"
          trailingIcon={require("../assets/icon_right.png")}
          style={styles.checkoutButton}
          action={() => router.push("/contact")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    ...STYLES.mainScreen,
    backgroundColor: "#F7F8FA",
    paddingHorizontal: 18,
  },
  emptySafeArea: {
    alignItems: "center",
    backgroundColor: "#F7F8FA",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  emptyIcon: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 34,
    height: 68,
    justifyContent: "center",
    marginBottom: 16,
    width: 68,
  },
  emptyCartIcon: {
    height: 32,
    tintColor: COLORS.black,
    width: 32,
  },
  emptyTitle: {
    color: COLORS.black,
    fontSize: 22,
    fontWeight: "900",
  },
  emptySubtitle: {
    color: COLORS.graySecondary,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
    marginTop: 12,
  },
  kicker: {
    color: "#B7791F",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  productContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    flexDirection: "row",
    marginBottom: 14,
    padding: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 4,
  },
  listContent: {
    paddingBottom: 16,
  },
  imageWrapper: {
    alignItems: "center",
    backgroundColor: "#F1F2F5",
    borderRadius: 16,
    height: 116,
    justifyContent: "center",
    marginRight: 12,
    width: 108,
  },
  productImage: {
    height: 96,
    resizeMode: "contain",
    width: 92,
  },
  itemDetails: {
    flex: 1,
  },
  itemTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemTitleBlock: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    ...STYLES.textPrimary,
    fontSize: 26,
    lineHeight: 32,
  },
  textTitle: {
    ...STYLES.textPrimary,
    color: COLORS.black,
    fontSize: 15,
    lineHeight: 20,
    textTransform: "none",
  },
  description: {
    ...STYLES.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  deleteIcon: {
    marginTop: -2,
  },
  itemBottomRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  priceLabel: {
    color: COLORS.graySecondary,
    fontSize: 11,
    fontWeight: "700",
  },
  price: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "900",
    marginTop: 2,
  },
  quantityButton: {
    marginLeft: 8,
  },
  lineTotal: {
    alignItems: "center",
    backgroundColor: "#FFF3D8",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  lineTotalLabel: {
    color: "#9A640F",
    fontSize: 12,
    fontWeight: "800",
  },
  lineTotalPrice: {
    color: "#9A640F",
    fontSize: 14,
    fontWeight: "900",
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    marginBottom: 12,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 6,
  },
  summaryRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textTotal: {
    color: COLORS.graySecondary,
    fontSize: 16,
    fontWeight: "700",
  },
  summaryValue: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "900",
  },
  divider: {
    backgroundColor: "#EEEEEE",
    height: 1,
    marginVertical: 12,
  },
  totalLabel: {
    color: COLORS.graySecondary,
    fontSize: 16,
    fontWeight: "800",
  },
  textPrice: {
    color: COLORS.black,
    fontSize: 24,
    fontWeight: "900",
  },
  checkoutButton: {
    borderRadius: 22,
    marginTop: 16,
    width: "100%",
  },
});

export default BasketScreen;
