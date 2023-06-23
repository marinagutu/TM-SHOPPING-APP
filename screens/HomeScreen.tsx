import { useNavigation } from "@react-navigation/native";

import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import useFetch from "../hooks/useFetch";

import { StyleSheet } from "react-native";

import { COLORS } from "../constants";

const HomeScreen = () => {
  const navigation = useNavigation();

  const { data, isLoading, error } = useFetch({
    endpoint: "products/categories",
  });

  const categories: string[] | null = data;

  const renderItem = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity
        style={{ marginVertical: 5 }}
        onPress={() =>
          navigation.navigate("Products", {
            screen: "ProductsScreen",
            params: {
              category: item,
            },
          })
        }
      >
        <View style={styles.container}>
          <Text style={styles.text}>{item}</Text>

          <View
            style={{
              height: 30,
              backgroundColor: "white",
              borderRadius: 100,
              width: 30,
            }}
          ></View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      {categories && <FlatList data={categories} renderItem={renderItem} />}
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

export default HomeScreen;
