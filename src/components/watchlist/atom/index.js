import { atom, atomFamily, selector, selectorFamily } from "recoil";
import {
  fetchWatchlistData,
  getDataFromLocal,
  getDetailCoin,
} from "../../../api/api";
import async from "async";
import Logo from "../../homeComponents/Header/Logo";
import AsyncStorage from "@react-native-async-storage/async-storage";

//*********************** watchlist localStorage ************************************
export const watchlistLocalAtom = atom({
  key: "watchlistLocalAtom",
  default: getDataFromLocal() || [],
});

export const watchlistAPSelector = selector({
  key: "watchlistAPSelector",
  get: async ({ get }) => {
    const localCoin = get(watchlistLocalAtom);
    if (localCoin.length < 1) return;
    const dataApi = await fetchWatchlistData(localCoin.join());
    return dataApi;
  },
});

export const watchlistCoinAtom = atom({
  key: "watchlistCoinAtom",
  default: watchlistAPSelector,
});

export const storeWatchlistDataLocalSelector = selectorFamily({
  key: "storeWatchlistDataLocalSelector",
  get:
    (id) =>
    async ({ get }) => {
      const local = get(watchlistLocalAtom);
      try {
        const exist = local?.some((item) => item === id);
        if (!exist) {
          const add = [...local, id];
          await AsyncStorage.setItem("@watchlist", JSON.stringify(add));
          return add;
        }
      } catch (e) {
        console.log("error stroring watchlist on localStorage", e);
      }
    },
});

export const removeIdFromWatchlistSelector = selectorFamily({
  key: "removeIdFromWatchlistSelector",
  get:
    (id) =>
    async ({ get }) => {
      const local = get(watchlistLocalAtom);
      const removeId = local.filter((coinId) => coinId !== id);
      await AsyncStorage.setItem("@watchlist", JSON.stringify(removeId));
      return removeId;
    },
});

//*********************** watchlist localStorage ************************************
