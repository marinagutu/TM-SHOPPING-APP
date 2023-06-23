import { SafeAreaView, View, StyleSheet} from "react-native";
import { Image,Text} from "react-native";
import { COLORS } from "../constants";
import { useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import {  HomeStackParamList } from "../navigation/TabNavigator";

const ProductDetailsScreen = () => {

  type ProductScreenProps = RouteProp<HomeStackParamList, "ProductDetailsScreen">;
  const params = useRoute<ProductScreenProps>().params
  const product = params?.product;
  
  console.log(product?.images[0])

return (
<SafeAreaView style={{flex: 1}}>
  <Image source={{uri: product?.images[0]}} style={{flex: 0.5, }}></Image>
  <View style={{flex: 0.6, backgroundColor:COLORS.white, marginTop: -20, borderTopEndRadius: 20, borderTopLeftRadius: 20}}></View>
</SafeAreaView>
)

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

  category: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 0,
    paddingHorizontal: 15,
    alignItems: "center",
  },

  text: {
    color: COLORS.white,
    textTransform: "capitalize",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductDetailsScreen;
