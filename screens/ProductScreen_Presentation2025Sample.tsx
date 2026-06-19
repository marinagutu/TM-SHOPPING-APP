import { SafeAreaView, StyleSheet, Text } from "react-native";
import { STYLES } from "../constants";
import { useLocalSearchParams } from "expo-router";

export type Product = {
  id: number;
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  quantity?: number;
  images: string[];
  rating: number;
  thumbnail: string;
  stock: string;
  title: string;
  price: number;
};

type Products = {
  products: Product[];
};

const ProductsScreen = () => {
  const { category } = useLocalSearchParams<{ category?: string }>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text>{category}</Text>
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
  screenTitle: {
    ...STYLES.textPrimary,
    marginBottom: 10,
  },
  container: {
    width: "50%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  textContainer: { marginHorizontal: 10, alignItems: "center" },
  textTitle: {
    ...STYLES.textPrimary,
    marginTop: 5,
  },
  textDescription: {
    ...STYLES.textSecondary,
    textAlign: "justify",
  },
  textPrice: {
    ...STYLES.textPrimary,
    marginBottom: 20,
  },
  indicator: {
    alignSelf: "center",
  },
});

export default ProductsScreen;
