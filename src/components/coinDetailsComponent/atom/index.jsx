import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { candleChartData, fetchPrices, getDetailCoin } from "../../../api/api";

//* **************************** single coin detail ************************************
export const fetchCoinDetailSelector = selector({
  key: "fetchCoinDetailSelector",
  get: async ({ get }) => {
    const coin = get(getCoinAtom);
    if (coin === "") return;
    const coinData = await getDetailCoin(coin);
    return coinData;
  },
});
export const selectedCoinAtom = atom({
  key: "selectedCoinAtom",
  default: fetchCoinDetailSelector,
});
export const getCoinAtom = atom({
  key: "getCoinAtom",
  default: "",
});

//* **************************** single coin detail ************************************

//* ************************************** chartData ********************************
export const chartDataFetchSelector = selector({
  key: "chartDataFetchSelector",
  get: async ({ get }) => {
    const coin = get(getCoinAtom);
    const interval = get(charIntervalAtom);
    if (interval === "" || coin === "") return;
    const price = fetchPrices(coin, interval);
    return price;
  },
});
const fetchPremiumChartDataSelector = selector({
  key: "fetchPremiumChartDataSelector",
  get: async ({ get }) => {
    const interval = get(charIntervalAtom);
    const coin = get(getCoinAtom);
    if (interval === "") return;
    const price = await candleChartData({ coin, interval });
    return price;
  },
});
export const standardChartAtom = atom({
  key: "standardChartAtom",
  default: chartDataFetchSelector,
});

export const toggleAtom = atom({
  key: "toggleAtom",
  default: true,
});

// chart state
export const charIntervalAtom = atom({
  key: "charIntervalState",
  default: 1,
});
// chart premium
export const candleChartDataAtom = atom({
  key: "pricesDataAtom",
  default: fetchPremiumChartDataSelector,
});
//* ************************************** chartData ********************************
