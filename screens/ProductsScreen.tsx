import {
  Text,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { STYLES } from "../constants";
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
        style={styles.container}
        onPress={() =>
          router.push({
            pathname: "/product-details",
            params: { product: JSON.stringify(item) },
          })
        }
      >
        <Image source={{ uri: item.thumbnail }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.textTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.textDescription} numberOfLines={2}>
            {item.brand}
          </Text>
          <Text style={styles.textPrice}>${item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={isLoading ? styles.emptySafeArea : styles.safeArea}>
      {isLoading && <Loading />}
      {data?.products && (
        <View style={{ flex: 1 }}>
          <View style={{ marginTop: 15, marginLeft: 25, gap: 15 }}>
            <BackIcon
              hasBackground
              containerStyle={{}}
              action={() => router.back()}
            />
            <Text style={styles.screenTitle}>{selectedCategory}</Text>
          </View>
          <FlatList
            data={data?.products}
            renderItem={renderItem}
            numColumns={2}
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
