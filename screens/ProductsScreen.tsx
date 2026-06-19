import {
  Text,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { COLORS, STYLES } from "../constants";
import useFetch from "../hooks/useFetch";
import ErrorComponent from "../components/common/ErrorComponent";
import BackIcon from "../components/common/Icons/BackIcon";
import Loading from "../components/common/Loading";
import { useLocalSearchParams, useRouter } from "expo-router";

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
  const router = useRouter();
  const selectedCategory = category ?? "";
  const { data, isLoading, error } = useFetch<Products>({
    endpoint: `products/category/${selectedCategory}`,
  });

  const renderItem = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.productCard}
        onPress={() =>
          router.push({
            pathname: "/product-details",
            params: { product: JSON.stringify(item) },
          })
        }
      >
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.thumbnail }} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.textDescription} numberOfLines={2}>
            {item.brand}
          </Text>
          <View style={styles.footer}>
            <Text style={styles.textPrice}>${item.price}</Text>
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={isLoading ? styles.emptySafeArea : styles.safeArea}>
      {isLoading && <Loading />}
      {data?.products && (
        <View style={styles.content}>
          <View style={styles.header}>
            <BackIcon
              hasBackground
              containerStyle={{}}
              action={() => router.back()}
            />
            <View>
              <Text style={styles.kicker}>Category</Text>
              <Text style={styles.screenTitle}>{selectedCategory}</Text>
            </View>
          </View>
          <FlatList
            data={data?.products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
      {error && <ErrorComponent />}
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
    backgroundColor: "#F7F8FA",
    flex: 1,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
    marginBottom: 18,
    marginTop: 14,
  },
  kicker: {
    color: "#B7791F",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  screenTitle: {
    ...STYLES.textPrimary,
    fontSize: 26,
    lineHeight: 32,
  },
  listContent: {
    paddingBottom: 26,
  },
  row: {
    gap: 12,
    marginBottom: 14,
  },
  productCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    flex: 1,
    overflow: "hidden",
    padding: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },
  imageWrapper: {
    alignItems: "center",
    backgroundColor: "#F1F2F5",
    borderRadius: 14,
    height: 138,
    justifyContent: "center",
    marginBottom: 10,
  },
  image: {
    height: 122,
    resizeMode: "contain",
    width: "100%",
  },
  textContainer: {
    minHeight: 86,
  },
  textTitle: {
    ...STYLES.textPrimary,
    fontSize: 14,
    lineHeight: 19,
    textTransform: "none",
  },
  textDescription: {
    ...STYLES.textSecondary,
    fontSize: 12,
    marginTop: 4,
    textTransform: "capitalize",
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  textPrice: {
    ...STYLES.textPrimary,
    color: COLORS.black,
    fontSize: 17,
  },
  rating: {
    backgroundColor: "#FFF3D8",
    borderRadius: 10,
    color: "#9A640F",
    fontSize: 12,
    fontWeight: "800",
    overflow: "hidden",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  indicator: {
    alignSelf: "center",
  },
});

export default ProductsScreen;
