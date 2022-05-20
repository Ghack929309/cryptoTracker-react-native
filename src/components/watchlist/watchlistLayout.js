import React from "react";
import { FlatList, RefreshControl } from "react-native";
import CoinLayout from "../homeComponents/cointLayout";
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil";
import { watchlistAPSelector, watchlistCoinAtom } from "./atom";

function WatchlistLayout() {
  const data = useRecoilValue(watchlistCoinAtom);
  const refresh = useRecoilRefresher_UNSTABLE(watchlistAPSelector);

  return (
    <FlatList
      data={data}
      refreshControl={<RefreshControl tintColor="white" onRefresh={refresh} />}
      renderItem={({ item }) => <CoinLayout allData={item} />}
    />
  );
}

export default WatchlistLayout;
