import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Ionicons } from "@expo/vector-icons";

function CoinNews({ id }) {
  const [interval, setInterval] = useState("24h");
  return (
    <View style={tw`px-3`}>
      <View
        style={[
          tw`flex-row  pb-6 justify-between  mt-8`,
          {
            borderBottomWidth: 1,
            borderBottomColor: "#7d7d7d",
          },
        ]}
      >
        <Text style={styles.statText}>Statistics</Text>
        <Pressable style={tw`flex-row items-center`}>
          <Text style={styles.textSee}>See All</Text>
          <Ionicons name="chevron-forward" size={20} color={"#4961E1"} />
        </Pressable>
      </View>
      <View style={tw`flex-row justify-between items-center my-6`}>
        <Text style={styles.lowHigh}>Low / High</Text>
        <View
          style={[
            tw` flex-row justify-between bg-gray-800`,
            {
              paddingHorizontal: 3,
              paddingVertical: 3,
              borderRadius: 5,
            },
          ]}
        >
          {["24h", "30d", "1y"].map((item, i) => (
            <Pressable
              key={item}
              onPress={() => setInterval(item)}
              style={{
                backgroundColor: item === interval ? "black" : "transparent",
                alignItems: "center",
                borderRadius: 5,
                marginRight: 8,
              }}
            >
              <Text
                style={{
                  ...styles.lowHigh,
                  color: item === interval ? "white" : "gray",
                  paddingHorizontal: 5,
                  paddingVertical: 3,
                }}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      {/*    market cap*/}
      <View style={tw`flex-row `}>
        <View style={[tw`border-r-2 border-gray-500`, { width: "45%" }]}>
          <View>
            <Text style={styles.title}>Market Cap</Text>
            <Text style={styles.newsData}>9000</Text>
          </View>
          <View>
            <Text style={styles.title}>Volume 24h</Text>
            <Text style={styles.newsData}>9000</Text>
          </View>
          <View>
            <Text style={styles.title}>Max supply</Text>
            <Text style={styles.newsData}>9000</Text>
          </View>
          <View>
            <Text style={styles.title}>All time High</Text>
            <Text style={styles.newsData}>9000</Text>
          </View>
          <View>
            <Text style={styles.title}>All Time low</Text>
            <Text style={styles.newsData}>9000</Text>
          </View>
        </View>
        <View style={tw`px-4`}>
          <View>
            <Text style={styles.title}>Fully Diluted Market Cap</Text>
            <Text style={styles.newsData}>9000</Text>
          </View>
          <View>
            <Text style={styles.title}>Circulating supply</Text>
            <Text style={styles.newsData}>9000</Text>
          </View>
          <View>
            <Text style={styles.title}>Total supply</Text>
            <Text style={styles.newsData}>9000</Text>
          </View>
          <View>
            <Text style={styles.title}>Rank</Text>
            <Text style={styles.newsData}>9000</Text>
          </View>
          <View>
            <Text style={styles.title}>Market Dominance</Text>
            <Text style={styles.newsData}>9000</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textSee: {
    color: "#4961E1",
    fontSize: 15,
    fontWeight: "600",
  },
  statText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },
  lowHigh: {
    color: "gray",
    fontSize: 16,
    fontWeight: "500",
  },
  newsData: {
    color: "white",
  },
  title: {
    color: "gray",
    marginBottom: 3,
    fontSize: 13,
  },
});
export default CoinNews;
