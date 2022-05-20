import { atom, atomFamily, selector } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { chartDataFetchSelector } from "../../coinDetailsComponent/atom";
import { fetchWatchlistData } from "../../../api/api";

// fetching coin list form local storage
export const portfolioBoughtAssetsSelector = selector({
  key: "portfolioBoughtAssetsSelector",
  get: async () => {
    const jsonValue = await AsyncStorage.getItem("@portfolio-coins");
    return jsonValue !== null ? JSON.parse(jsonValue) : [];
  },
});

//fake atom that will on refresh trigger get increment to call
// the boughtAssetsFromApiSelector to update data
export const refetchAtom = atomFamily({
  key: "refetchAtom",
  default: 0,
});

// selector update the coin list on local storage with new data
export const boughtAssetsFromAPISelector = selector({
  key: "boughtAssetsFromAPISelector",
  get: async ({ get }) => {
    const subscribeToLocalAssets = get(boughtAssetsFromLocalAtom);
    const ids = subscribeToLocalAssets.map((coin) => coin.id).join();
    const portfolioAssets = await fetchWatchlistData(ids);
    const assets = subscribeToLocalAssets.map((asset) => {
      const apiAssets = portfolioAssets.filter(
        (item) => asset.id === item.id
      )[0];
      return {
        ...asset,
        currentPrice: apiAssets.current_price,
        priceChangePercentage: apiAssets.price_change_percentage_24h,
      };
    });
    return assets.sort((item1, item2) => {
      return (
        item1.currentPrice * item1.quantityBought <
        item2.currentPrice * item2.quantityBought
      );
    });
  },
});

//storing information after fetching base on chart state
export const chartPricesAtom = atom({
  key: "chartPricesState",
  default: chartDataFetchSelector,
});

// store of updated data from the local storage
export const allPortfolioAssetsAtom = atom({
  key: "allPortfolioAssetsState",
  default: boughtAssetsFromAPISelector,
});
// store of data from the local storage
export const boughtAssetsFromLocalAtom = atom({
  key: "boughtAssetsFromLocalState",
  default: portfolioBoughtAssetsSelector,
});
