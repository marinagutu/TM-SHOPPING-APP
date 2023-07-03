import React from "react";
import {
  StyleSheet,
  ViewStyle,
  Image,
  Text,
  ImageSourcePropType,
  ImageStyle,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../constants";

type ButtonComponentProps = {
  title: string;
  style?: ViewStyle;
  frontIcon?: ImageSourcePropType;
  trailingIcon?: ImageSourcePropType;
  iconStyle?: ImageStyle;
  action?: () => void;
};

const ButtonComponent = (props: ButtonComponentProps) => {
  return (
    <TouchableOpacity
      onPress={props.action}
      style={{ ...style.container, ...props.style }}
    >
      {props.frontIcon && (
        <Image
          source={props.frontIcon}
          style={{ ...style.icon, ...props.iconStyle }}
        />
      )}
      <Text style={style.text}>{props.title}</Text>
      {props.trailingIcon && (
        <Image
          source={props.trailingIcon}
          style={{ ...style.icon, ...props.iconStyle }}
        />
      )}
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    gap: 10,
    borderRadius: 5,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    color: COLORS.white,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: COLORS.white,
  },
});
export default ButtonComponent;
