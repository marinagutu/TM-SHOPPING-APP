import Icon from "./Icon";
import { ImageStyle, TouchableOpacity, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants";

type BackIconProps = {
  hasBackground?: boolean;
  containerStyle?: ViewStyle;
  iconStyle?: ImageStyle;
  action?: () => void;
};

const DeleteIcon = ({
  hasBackground,
  containerStyle,
  iconStyle,
  action,
}: BackIconProps) => {
  return (
    <TouchableOpacity
      onPress={action}
      style={hasBackground && { ...styles.container, ...containerStyle }}
    >
      <Icon
        source={require("../../../assets/icon_delete.png")}
        style={{ ...iconStyle, ...styles.icon }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    backgroundColor: COLORS.black,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    width: 30,
  },
  icon: {
    height: 15,
    tintColor: COLORS.white,
    width: 15,
  },
});

export default DeleteIcon;
