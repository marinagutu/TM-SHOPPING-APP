import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import BackIcon from "../components/common/Icons/BackIcon";
import { StyleSheet } from "react-native";
import { COLORS } from "../constants";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { BasketStackParamList } from "../navigation/TabNavigator";
import ButtonComponent from "../components/common/ButtonComponent";
import { useState } from "react";

export type ContactForm = {
  name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
};

const ContactScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<BasketStackParamList>>();

  const initialValues: ContactForm = {
    name: "",
    phone: "",
    email: "",
    city: "",
    address: "",
  };

  const [values, setValues] = useState<ContactForm>(initialValues);

  const handleChange = (value: string, name: string) => {
    setValues({ ...values, [name]: value });
  };

  const handleConfirm = () => {
    // Check if any of the values are empty
    const isFormValid = Object.values(values).every(
      (value) => value.trim() !== ""
    );

    if (isFormValid) {
      navigation.navigate("CheckoutScreen", values);
    } else {
      Toast.show({
        type: "error",
        text1: "Please fill in all the fields",
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <BackIcon
          action={() => navigation.goBack()}
          hasBackground
          containerStyle={{ marginLeft: 12, marginTop: 10 }}
        />
        <Text style={styles.title}>Details</Text>
        <Image
          source={require("../assets/icon_data.jpg")}
          style={styles.image}
        />
        <TextInput
          style={styles.textInput}
          value={values.name}
          onChangeText={(value) => handleChange(value, "name")}
          placeholder="First and last name"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Phone"
          inputMode="tel"
          onChangeText={(value) => handleChange(value, "phone")}
          value={values.phone}
        />
        <TextInput
          style={styles.textInput}
          inputMode="email"
          placeholder="Email"
          onChangeText={(value) => handleChange(value, "email")}
          value={values.email}
        />
        <TextInput
          style={styles.textInput}
          placeholder="City"
          onChangeText={(value) => handleChange(value, "city")}
          value={values.city}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(value) => handleChange(value, "address")}
          placeholder="Street, number, apartment"
        />
        <View style={styles.buttonContainer}>
          <ButtonComponent
            title={"Cancel"}
            action={() => {
              navigation.goBack();
            }}
            style={styles.cancelButton}
            textStyle={{ color: COLORS.graySecondary, fontWeight: "700" }}
          />
          <ButtonComponent
            title={"Confirm"}
            action={handleConfirm}
            style={styles.confirmButton}
            textStyle={{ fontWeight: "700" }}
          />
        </View>
        <Toast position="bottom" />
      </ScrollView>
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
  image: {
    width: "90%",
    height: 180,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    resizeMode: "contain",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 20,
    flex: 1,
    alignItems: "flex-end",
  },
});

export default ContactScreen;
