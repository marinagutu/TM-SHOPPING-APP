import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#010409",

  secondary: "#161B22",

  accent: "#1A73E8",

  success: "#00C851",

  error: "#ff4444",

  black: "#171717",

  white: "#FFFFFF",

  background: "#252C4A",

  grayPrimary: "#282E35",

  grayLight: "#8C8C8C",
};

export const FONTS = {
  title: {
    marginTop: 30,

    marginBottom: 30,

    fontSize: 26,

    fontFamily: "Raleway-Bold",

    textAlign: "center",

    color: "white",
  },
};
