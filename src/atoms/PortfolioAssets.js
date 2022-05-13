import {atom, selector} from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useContext} from "react";
import {CoinProvider} from "../context/CoinContext";

export const portfolioBoughtAssets = selector({
    key: 'portfolioBoughtAssets',
    get: async () => {
        const jsonValue = await AsyncStorage.getItem('@portfolio-coins')
        return jsonValue !== null ? JSON.parse(jsonValue) : []
    }

})

export const boughtAssetsFromAPI = selector({
    key: "boughtAssetsFromAPI",
    get: async ({get}) => {
        const {fetchWatchlistData} = useContext(CoinProvider)
        const subscribeToLocalAssets = get(boughtAssetsFromLocal)
        const ids = subscribeToLocalAssets.map(coin => coin.id).join()
        const portfolioAssets = await fetchWatchlistData(ids)
        const assets = subscribeToLocalAssets.map(asset => {
            const apiAssets = portfolioAssets.filter(item => asset.id === item.id)[0]
            return {
                ...asset,
                currentPrice: apiAssets.current_price,
                priceChangePercentage: apiAssets.price_change_percentage_24
            }
        })
        return assets.sort((item1, item2) =>{
            return(item1.currentPrice * item1.quantityBought)<(item2.currentPrice * item2.quantityBought)
        })
    }
})

export const allPortfolioAssets = atom({
    key: 'allPortfolioAssets',
    default: boughtAssetsFromAPI
})

export const boughtAssetsFromLocal = atom({
    key: 'boughtAssetsFromLocal',
    default: portfolioBoughtAssets
})
