import Icon from "./Icon";
import { StyleSheet } from "react-native";

const BackIcon = () => {
  return (
    <Icon source={require("../../assets/icon_back")} style={styles.container} />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: 70,
  },
  icon: {
    height: 50,
    width: 50,
  },
});

export default BackIcon;
