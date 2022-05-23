import { memo, useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "react-query";
import uuid from "react-native-uuid";
import moment from "moment";
import { fetchCoinNews } from "../../../api/news";

function CoinNews({ id }) {
  const [interval, setInterval] = useState("24h");
  const { data, isLoading } = useQuery("coinNews", () => fetchCoinNews(id));

  return (
    <View style={tw`px-3 pb-8 flex-1`}>
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
          <Ionicons name="chevron-forward" size={20} color="#4961E1" />
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
      {/*    market cap */}
      <View style={tw`flex-row `}>
        <View style={[tw`border-r-2 border-gray-500`, { width: "50%" }]}>
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
      <View style={tw`mt-4 `}>
        <View style={tw`flex-row flex-1`}>
          <Pressable
            style={[
              tw`items-center py-2 flex-1 bg-gray-700 rounded-full `,
              { marginRight: 2 },
            ]}
          >
            <Text
              style={[
                tw`text-white text-sm`,
                {
                  fontSize: 14,
                  fontWeight: "500",
                },
              ]}
            >
              Compare
            </Text>
          </Pressable>
          <Pressable
            style={[
              tw` py-2 flex-1 items-center bg-gray-700 rounded-full`,
              { marginLeft: 2 },
            ]}
          >
            <Text
              style={[
                tw`text-white`,
                {
                  fontSize: 14,
                  fontWeight: "500",
                },
              ]}
            >
              Converter
            </Text>
          </Pressable>
        </View>
        <Pressable
          style={[tw`items-center flex-1 mt-3 py-3 bg-gray-700 rounded-lg`]}
        >
          <Text
            style={[
              tw`text-white`,
              {
                fontSize: 15,
                fontWeight: "500",
              },
            ]}
          >
            Buy Crypto
          </Text>
        </Pressable>
      </View>
      {/*  news */}
      <View style={tw`mt-6`}>
        <View
          style={[
            tw`flex-row justify-between items-center pb-4`,
            {
              borderBottomWidth: 1,
              borderBottomColor: "#7d7d7d",
            },
          ]}
        >
          <Text style={styles.statText}>Latest News</Text>
          <View style={tw`flex-row`}>
            <Text style={styles.textSee}>Read more</Text>
            <Ionicons name="chevron-forward" size={20} color="#4961E1" />
          </View>
        </View>
      </View>
      {/*  News layout */}
      {!isLoading &&
        data?.value.map((item, index) => (
          <View
            key={index}
            style={[
              tw`flex-row flex-1 mt-8 pb-3`,
              {
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: "#282828",
              },
            ]}
          >
            <View style={tw`flex-1 mr-2 justify-between`}>
              <Text style={[tw`font-semibold text-sm`, styles.newsData]}>
                {item?.name}
              </Text>
              <Text style={[tw`self-start text-gray-500 text-xs`]}>
                {moment(item?.datePublished).startOf("ss").fromNow()}
              </Text>
            </View>
            <Image
              source={{ uri: item?.image?.thumbnail?.contentUrl }}
              style={tw`w-20 h-20 bg-gray-800 rounded-lg`}
            />
          </View>
        ))}
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
export default memo(CoinNews);
