import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, SafeAreaView, Text, TextInput, View } from "react-native";
import useFetch from "../hooks/useFetch";
import { StyleSheet } from "react-native";
import { COLORS } from "../constants";
import { HomeStackParamList } from "../navigation/TabNavigator";
import ButtonComponent from "../components/common/ButtonComponent";

const CheckoutScreen = (props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const { data, isLoading, error } = useFetch<string[]>({
    endpoint: "products/categories",
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Details</Text>
      <Image source={require("../assets/icon_data.jpg")} style={styles.image} />
      <TextInput style={styles.textInput} placeholder="First and last name" />
      <TextInput style={styles.textInput} placeholder="Phone" />
      <TextInput style={styles.textInput} placeholder="Email" />
      <TextInput style={styles.textInput} placeholder="City" />
      <TextInput
        style={styles.textInput}
        placeholder="Street, number, apartment"
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginVertical: 20,
          flex: 1,
          alignItems: "flex-end",
        }}
      >
        <ButtonComponent
          title={"Cancel"}
          action={() => {
            props.navigation.goBack();
          }}
          style={styles.cancelButton}
          textStyle={{ color: COLORS.graySecondary, fontWeight: "700" }}
        />
        <ButtonComponent
          title={"Confirm"}
          style={styles.confirmButton}
          textStyle={{ fontWeight: "700" }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cancelButton: {
    width: 80,
    backgroundColor: COLORS.white,
  },
  confirmButton: {
    width: 100,
  },
  title: {
    marginVertical: 10,
    marginHorizontal: 20,
    fontWeight: "bold",
    fontSize: 22,
  },
  safeArea: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  textInput: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },
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
  image: {
    width: "90%",
    height: 180,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    resizeMode: "contain",
  },
});

export default CheckoutScreen;
