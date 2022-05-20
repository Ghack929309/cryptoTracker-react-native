import React, { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import SearchableDropDown from "react-native-searchable-dropdown";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { allCoinSelector, coinDetailAtom, coinDetailSelector } from "./atom";
import { boughtAssetsFromLocalAtom } from "../porfolioAssets/atoms/PortfolioAssets";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

function NewAssetLayout() {
  const navigation = useNavigation();
  const allCoin = useRecoilValue(allCoinSelector);
  const assetInfo = useRecoilValue(coinDetailSelector);
  const setId = useSetRecoilState(coinDetailAtom);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [assetsInLocal, setAssetsInLocal] = useRecoilState(
    boughtAssetsFromLocalAtom
  );
  const [assetQuantity, setAssetQuantity] = useState("");
  const emptyInput = assetQuantity === "";

  useEffect(() => {
    if (selectedCoin !== "") {
      setId(selectedCoin);
    }
  }, [selectedCoin]);
  //all functions are here
  const onAddNewAsset = async () => {
    const {
      id,
      name,
      image: { small },
      symbol,
      market_data: {
        current_price: { usd },
      },
    } = assetInfo;
    const newAssets = {
      id,
      key: uuid.v4(),
      name,
      image: small,
      ticker: symbol.toUpperCase(),
      quantityBought: assetQuantity,
      priceBought: usd,
    };
    const storage = [...assetsInLocal, newAssets];
    await AsyncStorage.setItem("@portfolio-coins", JSON.stringify(storage));
    setAssetsInLocal(storage);
    navigation.goBack();
  };
  return (
    <KeyboardAvoidingView
      style={tw`flex-1`}
      keyboardVerticalOffset={80}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SearchableDropDown
        items={allCoin}
        onItemSelect={(item) => setSelectedCoin(item.id)}
        containerStyle={styles.container}
        itemStyle={styles.item}
        itemTextStyle={{ color: "white" }}
        resetValue={false}
        placeholder={selectedCoin || "Select a coin..."}
        placeholderTextColor="white"
        textInputProps={{
          underlineColorAndroid: "transparent",
          style: styles.inputProps,
        }}
      />
      {assetInfo && (
        <>
          <View style={[tw`flex-row items-start flex-1`, { marginTop: 50 }]}>
            <View
              style={[tw`flex-col items-end justify-center`, { width: "70%" }]}
            >
              <View style={tw`flex-row`}>
                <TextInput
                  value={assetQuantity}
                  style={{ color: "white", fontSize: 90 }}
                  placeholder="0"
                  keyboardType="numeric"
                  onChangeText={(text) => setAssetQuantity(text)}
                />
                <Text style={styles.coinName}>
                  {assetInfo?.symbol?.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.perCoin}>
                ${assetInfo?.market_data?.current_price?.usd} per coin
              </Text>
            </View>
            <View style={tw`self-start mt-10 items-center flex-1`}>
              <View style={tw`pl-4 items-center`}>
                <FontAwesome
                  name="exchange"
                  style={{ transform: [{ rotate: "90deg" }] }}
                  size={25}
                  color="#444444"
                />
                <Text style={[tw`font-semibold mt-2`, { color: "#535252" }]}>
                  USD
                </Text>
              </View>
            </View>
          </View>
          <Pressable
            onPress={onAddNewAsset}
            disabled={emptyInput}
            style={{
              ...styles.bottomContainer,
              backgroundColor: emptyInput ? "#303030" : "#4961E1",
            }}
          >
            <Text
              style={{
                ...styles.bottomText,
                color: emptyInput ? "gray" : "white",
              }}
            >
              Add new Assets
            </Text>
          </Pressable>
        </>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  item: {
    padding: 10,
    marginTop: 2,
    backgroundColor: "#1e1e1e",
    borderWidth: 1,
    borderColor: "#444444",
    borderRadius: 5,
  },
  inputProps: {
    padding: 12,
    borderWidth: 1.5,
    borderColor: "#444444",
    borderRadius: 5,
    backgroundColor: "#1e1e1e",
    color: "white",
  },
  coinName: {
    color: "gray",
    fontWeight: "700",
    fontSize: 20,
    marginTop: 25,
    marginLeft: 5,
  },
  bottomContainer: {
    padding: 10,
    alignItems: "center",
    marginVertical: 30,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  bottomText: {
    fontSize: 17,
    fontWeight: "600",
  },
  perCoin: {
    color: "#535252",
    fontSize: 19,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
});
export default NewAssetLayout;
