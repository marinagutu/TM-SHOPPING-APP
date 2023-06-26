import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const Loading = () => {
  return (
    <View style={style.container}>
      <ActivityIndicator size={"large"} color={COLORS.black} />
      <Text style={style.title}>Loading...</Text>
      <Text style={style.subtitle}>Please wait while data is loading.</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginTop: -50,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
  },
  subtitle: {
    color: COLORS.graySecondary,
    fontSize: 16,
    marginTop: 5,
  },
});

export default Loading;
