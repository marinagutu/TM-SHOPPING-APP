import React from "react";
import { Text, Image, StyleSheet, View } from "react-native";
import { COLORS } from "../../constants";

const ErrorComponent = () => {
  return (
    <View style={style.container}>
      <Image
        source={require("../../assets/icon_error.png")}
        style={style.image}
      />
      <Text style={style.textErrorTitle}>We'are sorry</Text>
      <Text style={style.textErrorSubtitle}>
        Something went wrong. Please try again.
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    alignContent: "center",
    tintColor: "gray",
  },
  textErrorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
  },
  textErrorSubtitle: {
    fontSize: 16,
    color: "gray",
  },
});

export default ErrorComponent;
