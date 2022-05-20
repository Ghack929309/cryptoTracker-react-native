import React, { Suspense } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import tw from "tailwind-react-native-classnames";
import WatchlistLayout from "../components/watchlist/watchlistLayout";
import { useRecoilValue } from "recoil";
import { watchlistLocalAtom } from "../components/watchlist/atom";

function WatchList() {
  const watchlist = useRecoilValue(watchlistLocalAtom);

  if (watchlist.length === 0)
    return (
      <View>
        <Text style={tw`text-gray-400 mt-12 font-semibold text-xl self-center`}>
          No Data
        </Text>
      </View>
    );

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <WatchlistLayout />
    </Suspense>
  );
}

export default WatchList;
