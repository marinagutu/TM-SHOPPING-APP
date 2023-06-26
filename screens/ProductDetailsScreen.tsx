import {
  SafeAreaView,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Image, Text } from "react-native";
import { COLORS } from "../constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { HomeStackParamList } from "../navigation/TabNavigator";
import QuantityButton from "../components/common/QuantityButton";

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        resizeMode="stretch"
        source={{ uri: product?.thumbnail }}
        style={{ flex: 0.4 }}
      >
        <TouchableOpacity onPress={goBack}>
          <Image
            source={require("../assets/icon_back.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.detailsCard}>
        <View style={{ flexDirection: "row" }}>
          <View id="first">
            <Text style={{ ...styles.textTitle }}>{product?.title}</Text>
            <Text style={styles.textDescription}>{product?.category}</Text>
            <View style={styles.reviewsWrapper}>
              <Image
                source={require("../assets/icon_rating.png")}
                style={styles.ratingIcon}
              />
              <Text>{product?.rating} (Reviews Score)</Text>
            </View>
          </View>
          <View id="second">
            <Text>Available in stock</Text>
            <QuantityButton />
          </View>
        </View>

        <Text style={styles.textTitle}>Description</Text>
        <Text style={styles.textDescription}>{product?.description}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    height: 60,
    marginHorizontal: 30,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "800",
    textTransform: "capitalize",
    width: "70%",
    marginBottom: 15,
  },
  textDescription: {
    color: COLORS.graySecondary,
    fontSize: 14,
    textTransform: "capitalize",
  },
  backIcon: {
    width: 35,
    height: 35,
    tintColor: "grey",
    marginTop: 15,
    marginLeft: 15,
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
    marginVertical: 10,
  },

  detailsCard: {
    flex: 0.6,
    backgroundColor: COLORS.white,
    marginTop: -20,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
});

export default ProductDetailsScreen;
