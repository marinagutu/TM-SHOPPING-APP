# 1 BasketScreen Styles

const styles = StyleSheet.create({
safeArea: {
...STYLES.mainScreen,
},
emptySafeArea: {
alignItems: "center",
flex: 1,
justifyContent: "center",
},
productContainer: {
borderRadius: 20,
marginHorizontal: 20,
marginBottom: 20,
},
checkoutButton: { marginHorizontal: 20, marginVertical: 10 },
quantityButton: { marginBottom: 10, marginLeft: 10 },
deleteIcon: { alignSelf: "flex-end", marginTop: 10, marginRight: 10 },
imageBackground: {
height: 100,
overflow: "hidden",
borderRadius: 10,
},
textContainer: {
flexDirection: "row",
alignItems: "center",
},
title: {
...STYLES.textPrimary,
marginLeft: 20,
marginVertical: 10,
},
textTitle: {
...STYLES.textPrimary,
marginTop: 5,
color: COLORS.black,
},
description: {
marginBottom: 10,
...STYLES.textSecondary,
},
price: {
fontSize: 20,
marginRight: 20,
fontWeight: "800",
color: COLORS.white,
},
textTotal: {
marginHorizontal: 20,
fontSize: 16,
color: COLORS.graySecondary,
fontWeight: "600",
flex: 1,
},
textPrice: {
fontSize: 20,
fontWeight: "bold",
marginHorizontal: 20,
},
totalPricesFlex: { flexDirection: "row", marginVertical: 10 },
});

# 2 Checkout Screen Styles

const styles = StyleSheet.create({
safeArea: {
...STYLES.mainScreen,
backgroundColor: COLORS.grayLight,
paddingHorizontal: 15,
},
title: {
...STYLES.textPrimary,
},
addressCard: {
marginVertical: 5,
paddingLeft: 10,
paddingVertical: 20,
gap: 10,
backgroundColor: COLORS.white,
borderRadius: 10,
width: "100%",
},
productCard: {
height: 80,
marginVertical: 5,
flexDirection: "row",
paddingLeft: 10,
gap: 10,
alignItems: "center",
backgroundColor: COLORS.white,
borderRadius: 10,
width: "100%",
},
thumbnail: {
height: 50,
borderRadius: 10,
width: 50,
},
textTitle: {
...STYLES.textPrimary,
},
textDescription: {
...STYLES.textSecondary,
},
orderButton: { borderRadius: 20, width: "50%", alignSelf: "center" },
});

# 3 Contact screen styles

const styles = StyleSheet.create({
cancelButton: {
width: 80,
backgroundColor: COLORS.white,
},
confirmButton: {
width: 100,
},
title: {
marginVertical: 10,
marginHorizontal: 20,
fontWeight: "bold",
fontSize: 22,
},
safeArea: {
backgroundColor: COLORS.white,
flex: 1,
},
textInput: {
backgroundColor: COLORS.white,
marginHorizontal: 20,
marginVertical: 5,
paddingHorizontal: 10,
paddingVertical: 15,
borderRadius: 10,
borderWidth: 1,
borderColor: COLORS.grayLight,
},
image: {
width: "90%",
height: 180,
marginHorizontal: 20,
marginBottom: 10,
borderRadius: 10,
resizeMode: "contain",
},
buttonContainer: {
flexDirection: "row",
justifyContent: "space-between",
marginHorizontal: 20,
marginVertical: 20,
flex: 1,
alignItems: "flex-end",
},
});
