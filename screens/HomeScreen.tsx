import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useFetch from "../hooks/useFetch";
import { StyleSheet } from "react-native";
import { COLORS, STYLES } from "../constants";
import { HomeStackParamList } from "../navigation/TabNavigator";

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const { data } = useFetch<string[]>({
    endpoint: "products/category-list",
  });

  const renderItem = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity
        style={{ marginVertical: 5 }}
        onPress={() =>
          navigation.navigate("ProductsScreen", {
            category: item,
          })
        }
      >
        <View style={styles.container}>
          <Text style={styles.text}>{item}</Text>
          <View style={styles.dot} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1, marginHorizontal: 30 }}>
        <Text style={styles.title}>Categories</Text>
        {data && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
          />
        )}
        {/* le aratam diferenta intre map si flatlist */}
        {/* {data?.map((item, index) => (
          <Text key={index}>{item}</Text>
        ))} */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    ...STYLES.mainScreen,
  },

  container: {
    backgroundColor: COLORS.black,
    height: 60,
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
    alignItems: "center",
  },
  title: {
    ...STYLES.textPrimary,
    marginVertical: 10,
  },

  dot: {
    height: 30,
    backgroundColor: COLORS.white,
    borderRadius: 100,
    width: 30,
  },

  text: {
    color: COLORS.white,
    textTransform: "capitalize",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
