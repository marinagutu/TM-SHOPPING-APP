import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text } from "react-native";

const CheckoutScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text>Blabla</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "white" },
});

export default CheckoutScreen;
