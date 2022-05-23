import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRecoilValue } from "recoil";
import { allPortfolioAssetsAtom } from "../atoms/PortfolioAssets";

function Header() {
  const assets = useRecoilValue(allPortfolioAssetsAtom);

  const currentBalance = assets.reduce(
    (total, price) => total + price.currentPrice * price.quantityBought,
    0,
  );
  const boughtValue = assets.reduce(
    (total, price) => total + price.priceBought * price.quantityBought,
    0,
  );
  const percentageValue =
    ((currentBalance - boughtValue) / boughtValue) * 100 || 0;
  const color = percentageValue < 0 ? "#ea3943" : "#16c784" || "white";
  const icon = percentageValue < 0 ? "caretdown" : "caretup" || "caretup";
  return (
    <>
      <View style={styles.balanceContainer}>
        <View>
          <Text style={[styles.text, { fontSize: 16 }]}>Current Price</Text>
          <Text style={[styles.text, styles.currentBalance]}>
            {currentBalance.toFixed(2)}
          </Text>
          <Text
            style={{
              ...styles.valueChange,
              marginTop: 4,
              color: boughtValue - currentBalance > 0 ? "#16c784" : "#ea3943",
            }}
          >
            {(boughtValue - currentBalance).toFixed(2)}
            US$ (24h)
          </Text>
        </View>
        <View
          style={{
            ...styles.pricePercentage,
            backgroundColor: color,
          }}
        >
          <AntDesign
            name={icon}
            style={{ marginRight: 2 }}
            size={10}
            color="white"
          />
          <Text style={[styles.text, styles.percentage]}>
            {percentageValue.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View style={styles.assetContainer}>
        <Text style={[styles.assetsText]}>Your assets</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  currentBalance: {
    fontSize: 40,
    fontWeight: "700",
    letterSpacing: 1,
  },
  valueChange: {
    fontWeight: "600",
    fontSize: 16,
    color: "#16c784",
  },
  percentage: {
    fontWeight: "500",
    fontSize: 17,
  },
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  pricePercentage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  assetsText: {
    fontWeight: "700",
    color: "white",
    marginTop: 10,
    fontSize: 23,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  assetContainer: {},
  bottomContainer: {
    backgroundColor: "#4961E1",
    padding: 10,
    alignItems: "center",
    marginVertical: 25,
    marginHorizontal: 15,
    borderRadius: 5,
  },
  bottomText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },
});
export default Header;
