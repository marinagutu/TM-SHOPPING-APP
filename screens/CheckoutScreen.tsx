import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { STYLES, COLORS } from "../constants";
import { Product } from "./ProductsScreen";
import BackIcon from "../components/common/Icons/BackIcon";
import useCart from "../hooks/useCart";
import ButtonComponent from "../components/common/ButtonComponent";
import CustomModal from "../components/common/CustomModal";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

const CheckoutScreen = () => {
  const params = useLocalSearchParams<{
    name?: string;
    phone?: string;
    email?: string;
    city?: string;
    address?: string;
  }>();
  const { cartItems, clearCart } = useCart();
  const [open, setIsOpen] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>();

  const router = useRouter();

  const submitOrder = () => {
    clearCart();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    router.replace("/(tabs)/(basket)");
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

  const renderItem = ({ item }: { item: Product }) => {
    return (
      <View style={styles.productCard}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.textTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.textDescription} numberOfLines={1}>
            {item.brand}
          </Text>
          <Text style={styles.quantityText}>Qty: {item.quantity}</Text>
        </View>
        <Text style={styles.itemTotal}>${item.price * item.quantity!}</Text>
      </View>
    );
  };

  const renderAddressRow = (label: string, value?: string) => {
    return (
      <View style={styles.addressRow}>
        <Text style={styles.addressLabel}>{label}</Text>
        <Text style={styles.addressValue}>{value}</Text>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <>
        <View style={styles.header}>
          <BackIcon
            hasBackground
            containerStyle={{}}
            action={() => router.back()}
          />
          <View>
            <Text style={styles.kicker}>Checkout</Text>
            <Text style={styles.title}>Confirm order</Text>
          </View>
        </View>

        <View style={styles.addressCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Ready</Text>
            </View>
          </View>
          {renderAddressRow("Full Name", params.name)}
          {renderAddressRow("Phone", params.phone)}
          {renderAddressRow("Email", params.email)}
          {renderAddressRow("City", params.city)}
          {renderAddressRow("Address", params.address)}
        </View>

        <Text style={styles.listTitle}>Order items</Text>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
      <View style={styles.footer}>
        <View>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.totalPrice}>${totalPrice ?? 0}</Text>
        </View>
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
    backgroundColor: "#F7F8FA",
    paddingHorizontal: 18,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
    marginBottom: 18,
    marginTop: 12,
  },
  kicker: {
    color: "#B7791F",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  title: {
    ...STYLES.textPrimary,
    fontSize: 26,
    lineHeight: 32,
  },
  addressCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 16,
    width: "100%",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 4,
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sectionTitle: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "900",
  },
  badge: {
    backgroundColor: "#FFF3D8",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    color: "#9A640F",
    fontSize: 12,
    fontWeight: "900",
  },
  addressRow: {
    borderTopColor: "#EEEEEE",
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  addressLabel: {
    color: COLORS.graySecondary,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4,
  },
  addressValue: {
    color: COLORS.black,
    fontSize: 15,
    fontWeight: "800",
  },
  listTitle: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 10,
    marginTop: 22,
  },
  listContent: {
    paddingBottom: 18,
  },
  productCard: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 18,
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
    padding: 10,
  },
  imageWrapper: {
    alignItems: "center",
    backgroundColor: "#F1F2F5",
    borderRadius: 14,
    height: 62,
    justifyContent: "center",
    width: 62,
  },
  thumbnail: {
    height: 52,
    resizeMode: "contain",
    width: 52,
  },
  productInfo: {
    flex: 1,
  },
  textTitle: {
    ...STYLES.textPrimary,
    color: COLORS.black,
    fontSize: 15,
    lineHeight: 20,
    textTransform: "none",
  },
  textDescription: {
    ...STYLES.textSecondary,
    fontSize: 12,
    marginTop: 3,
  },
  quantityText: {
    color: "#9A640F",
    fontSize: 12,
    fontWeight: "800",
    marginTop: 5,
  },
  itemTotal: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "900",
  },
  footer: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 6,
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
  orderButton: { borderRadius: 22, width: 165 },
});

export default CheckoutScreen;
