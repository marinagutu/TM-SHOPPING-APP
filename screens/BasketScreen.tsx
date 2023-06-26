import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { COLORS } from "../constants";
import ButtonComponent from "../components/common/ButtonComponent";
const BasketScreen = () => {
  const data = [
    {
      id: 16,
      title: "Hyaluronic Acid Serum",
      description:
        "L'OrÃ©al Paris introduces Hyaluron Expert Replumping Serum formulated with 1.5% Hyaluronic Acid",
      price: 19,
      discountPercentage: 13.31,
      rating: 4.83,
      stock: 110,
      brand: "L'Oreal Paris",
      category: "skincare",
      thumbnail: "https://i.dummyjson.com/data/products/16/thumbnail.jpg",
      images: ["https://i.dummyjson.com/data/products/16/1.png"],
    },
    {
      id: 17,
      title: "Tree Oil 30ml",
      description:
        "Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,",
      price: 12,
      discountPercentage: 4.09,
      rating: 4.52,
      stock: 78,
      brand: "Hemani Tea",
      category: "skincare",
      thumbnail: "https://i.dummyjson.com/data/products/17/thumbnail.jpg",
      images: ["https://i.dummyjson.com/data/products/17/1.jpg"],
    },
    {
      id: 18,
      title: "Oil Free Moisturizer 100ml",
      description:
        "Dermive Oil Free Moisturizer with SPF 20 is specifically formulated with ceramides, hyaluronic acid & sunscreen.",
      price: 40,
      discountPercentage: 13.1,
      rating: 4.56,
      stock: 88,
      brand: "Dermive",
      category: "skincare",
      thumbnail: "https://i.dummyjson.com/data/products/18/thumbnail.jpg",
      images: ["https://i.dummyjson.com/data/products/18/1.jpg"],
    },
  ];

  const getTotalPrice = () => {
    let price = 0;
    data.forEach((item) => {
      price = price + item.price;
    });
  };

  const renderItem = ({ item }) => {
    return (
      <View style={style.container}>
        <ImageBackground
          source={{ uri: item.thumbnail }}
          style={style.imageBackground}
        >
          <View
            style={{
              backgroundColor: COLORS.black,
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignSelf: "flex-end",
              marginRight: 10,
              marginTop: 10,
            }}
          >
            <Image
              source={require("../assets/icon_delete.png")}
              style={style.iconDelete}
            />
          </View>
        </ImageBackground>
        <View style={style.textContainer}>
          <View style={{ flex: 1, alignContent: "center" }}>
            <Text style={style.textTitle}>{item.title}</Text>
            <Text style={style.description}>{item.brand}</Text>
          </View>
          <Text style={style.price}>${item.price?.toFixed(2)}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={style.safeArea}>
      <Text style={style.title}>My Cart</Text>
      <FlatList data={data} renderItem={renderItem} />

      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
        }}
      >
        <Text style={style.textTotal}>Total (3 item)</Text>
        <Text style={style.textPrice}>$500 </Text>
      </View>

      <ButtonComponent
        title="Proceed to Checkout"
        trailingIcon={require("../assets/icon_back.png")}
        // iconStyle={{
        //   tintColor: COLORS.black,
        //   backgroundColor: COLORS.white,
        //   borderRadius: 5,
        //   resizeMode: "center",
        //   width: 28,
        //   height: 28,
        // }}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "black",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  imageBackground: {
    height: 150,
    overflow: "hidden",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconDelete: {
    width: 20,
    height: 20,
    tintColor: COLORS.white,
    alignSelf: "center",
  },
  title: {
    marginHorizontal: 20,
    paddingBottom: 20,
    fontWeight: "400",
    fontSize: 24,
  },
  textTitle: {
    marginHorizontal: 20,
    fontWeight: "600",
    marginTop: 5,
    fontSize: 20,
    color: COLORS.white,
  },
  description: {
    marginHorizontal: 20,
    marginBottom: 10,
    color: COLORS.white,
  },
  price: {
    fontSize: 20,
    marginRight: 20,
    fontWeight: "800",
    color: COLORS.white,
  },
  textTotal: {
    marginHorizontal: 20,
    fontSize: 16,
    color: COLORS.graySecondary,
    fontWeight: "600",
    flex: 1,
  },
  textPrice: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
});

export default BasketScreen;
