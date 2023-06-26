import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { COLORS } from "../../constants";

type QuantityButtonProps = {
  styles: ViewStyle;
  leftAction: () => void;
  rightAction: () => void;
};

const QuantityButton = (props: QuantityButtonProps) => {
  return (
    <View style={{ ...styles.container, ...props.styles }}>
      <TouchableOpacity>
        <Text style={styles.text}>-</Text>
      </TouchableOpacity>
      <Text style={styles.text}>2</Text>
      <TouchableOpacity>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuantityButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 20,
    backgroundColor: COLORS.grayLight,
    borderRadius: 20,
    justifyContent: "center",
    width: 100,
    height: 40,
    alignItems: "center",
  },
  text: {
    fontWeight: "500",
    fontSize: 20,
  },
});
