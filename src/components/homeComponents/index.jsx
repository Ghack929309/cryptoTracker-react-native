import { ActivityIndicator, VirtualizedList } from "react-native";
import { useQuery } from "react-query";
import CoinLayout from "./cointLayout";
import { fetchData } from "../../api/api";

function CoinList() {
  // const coinData = useRecoilValue(getCoinDataAtom);

  const { data, isLoading } = useQuery("allCoinData", () => fetchData(1));

  // when loading
  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }
  // when component did mount

  // const refresh = useRecoilRefresher_UNSTABLE(gettingDataWithPriceSelector)

  const getItemCount = (data) => {
    return data?.length;
  };
  const getItem = (data, index) => {
    return data[index];
  };
  // const loadMore = async () => {
  //   await fetchNextPage();
  // };
  return (
    <VirtualizedList
      data={data}
      // onEndReached={() => loadMore()}
      initialNumToRender={20}
      keyExtractor={(item) => item.id}
      getItemCount={getItemCount}
      getItem={getItem}
      // refreshControl={
      //     <RefreshControl onRefresh={refresh}
      //                     tintColor='white'/>
      // }
      renderItem={({ item }) => <CoinLayout key={item.id} allData={item} />}
      ListFooterComponent={<ActivityIndicator size="large" />}
    />
  );
}

export default CoinList;
