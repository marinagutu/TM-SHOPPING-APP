import {
  Text,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS, STYLES } from "../constants";
import useFetch from "../hooks/useFetch";
import { RouteProp } from "@react-navigation/native";
import { HomeStackParamList } from "../navigation/TabNavigator";
import ErrorComponent from "../components/common/ErrorComponent";
import BackIcon from "../components/common/Icons/BackIcon";
import Loading from "../components/common/Loading";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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
  type ProductScreenProps = RouteProp<HomeStackParamList, "ProductsScreen">;
  const params = useRoute<ProductScreenProps>().params;
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const { data, isLoading, error } = useFetch<Products>({
    endpoint: `products/category/${params.category}`,
  });

  const renderItem = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          navigation.navigate("ProductDetailsScreen", { product: item })
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
    <SafeAreaView style={styles.safeArea}>
      {isLoading && <Loading />}
      {data?.products && (
        <View>
          <View style={{ marginTop: 15, marginLeft: 25, gap: 15 }}>
            <BackIcon
              hasBackground
              containerStyle={{}}
              action={() => navigation.goBack()}
            />
            <Text style={styles.screenTitle}>{params.category}</Text>
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
