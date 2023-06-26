import React from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  Image,
  Text,
  ImageSourcePropType,
  ImageStyle,
} from "react-native";
import { COLORS } from "../../constants";

type ButtonComponentProps = {
  title: string;
  style?: ViewStyle;
  frontIcon?: ImageSourcePropType;
  trailingIcon?: ImageSourcePropType;
  iconStyle?: ImageStyle;
};

const ButtonComponent = (props: ButtonComponentProps) => {
  return (
    <View style={{ ...style.container, ...props.style }}>
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
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    flex: 1,
    marginHorizontal: 20,
    color: COLORS.white,
  },
  icon: {
    width: 20,
    height: 20,
    marginHorizontal: 20,
    tintColor: COLORS.white,
  },
});
export default ButtonComponent;
