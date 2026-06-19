import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, STYLES } from "../constants";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const { data } = useFetch<string[]>({
    endpoint: "products/category-list",
  });

  const router = useRouter();

  function showData() {
    if (data) console.log("data from api:", data);
  }

  useEffect(showData, [data]);

  const renderItem = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.78}
        style={styles.categoryCard}
        onPress={() =>
          router.push({
            pathname: "/products/[category]",
            params: { category: item },
          })
        }
      >
        <View style={styles.accentLine} />
        <View style={styles.categoryIcon}>
          <Text style={styles.categoryInitial}>{item.charAt(0)}</Text>
        </View>
        <Text style={styles.text} numberOfLines={2}>
          {item}
        </Text>
        <Text style={styles.subtitle}>Shop now</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.kicker}>TM Shopping</Text>
          <Text style={styles.title}>What are you looking for?</Text>
        </View>
        {data && (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
        {/* le aratam diferenta intre map si flatlist */}
        {/* {data?.map((item, index) => (
          <Text key={index}>{item}</Text>
        ))} */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    ...STYLES.mainScreen,
    backgroundColor: "#FFFFFF",
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  listContent: {
    paddingBottom: 24,
  },

  categoryCard: {
    alignItems: "center",
    backgroundColor: "#F6F7FB",
    borderRadius: 20,
    flexDirection: "row",
    marginBottom: 12,
    minHeight: 86,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 3,
  },

  accentLine: {
    backgroundColor: "#E8B44C",
    borderRadius: 4,
    height: 46,
    marginRight: 14,
    width: 5,
  },

  categoryIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  categoryInitial: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "900",
    textTransform: "uppercase",
  },

  header: {
    marginBottom: 20,
    marginTop: 10,
  },

  title: {
    ...STYLES.textPrimary,
    fontSize: 30,
    lineHeight: 36,
    maxWidth: 280,
  },

  kicker: {
    color: "#B7791F",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0,
    marginBottom: 8,
    textTransform: "uppercase",
  },

  text: {
    flex: 1,
    color: COLORS.black,
    textTransform: "capitalize",
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 23,
  },

  subtitle: {
    color: COLORS.graySecondary,
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 12,
  },
});

export default HomeScreen;
