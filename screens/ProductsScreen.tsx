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
import { COLORS } from "../constants";
import useFetch from "../hooks/useFetch";
import { RootStackParamList } from "../navigation/RootNavigator";
import { RouteProp } from "@react-navigation/native";
import { HomeStackParamList } from "../navigation/TabNavigator";
import { Colors } from "react-native/Libraries/NewAppScreen";
import ErrorComponent from "../components/common/ErrorComponent";
import Loading from "../components/common/Loading";

type Product = {
  id: number;
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  images: string[];
  rating: number;
  thumbnail: string;
  stock: string;
  title: string;
  price: string;
};

type Products = {
  products: Product[];
};

const ProductsScreen = () => {
  type ProductScreenProps = RouteProp<HomeStackParamList, "ProductsScreen">;

  const params = useRoute<ProductScreenProps>().params;

  const { data, isLoading, error } = useFetch<Products>({
    endpoint: `products/category/${params.category}`,
  });

  const renderItem = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={
          () => {}
          // navigation.navigate("CategoriesScreen", {
          //   category: item,
          // })
        }
      >
        <Image source={{ uri: item.thumbnail }} style={styles.image} />
        <View style={{ marginHorizontal: 10, alignItems: "center" }}>
          <Text style={styles.textTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.textDescription} numberOfLines={2}>
            {item.description}
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
        <>
          <Text style={styles.screenTitle}>{params.category}</Text>
          <FlatList
            data={data?.products}
            renderItem={renderItem}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            style={styles.list}
          />
        </>
      )}
      {error && <ErrorComponent />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.white,
    justifyContent: "center",
    flex: 1,
  },
  screenTitle: {
    textTransform: "capitalize",
    fontWeight: "bold",
    marginLeft: 15,
    marginTop: 5,
    fontSize: 20,
  },
  list: {
    padding: 10,
  },
  container: {
    width: "50%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 170,
    height: 170,
    borderRadius: 10,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginTop: 5,
  },
  textDescription: {
    color: COLORS.grayLight,
    fontSize: 11,
  },
  textPrice: {
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 20,
  },
  indicator: {
    alignSelf: "center",
  },
});

export default ProductsScreen;
