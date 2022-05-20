import { atom, selector, selectorFamily } from "recoil";
import { fetchAllCoin, getDetailCoin } from "../../../api/api";

// export const coinDetailSelector = selector({
//   key: "coinDetailSelector",
//   get: async ({ get }) => {
//     const id = get(coinDetailAtom);
//     if (id === "") return;
//     const detail = await getDetailCoin(id);
//     return detail;
//   },
// });
//
// export const coinDetailAtom = atom({
//   key: "coinDetailAtom",
//   default: "",
// });

// export const allCoinSelector = selector({
//   key: "allCoinSelector",
//   get: async () => {
//     const coins = await fetchAllCoin();
//     return coins;
//   },
// });
