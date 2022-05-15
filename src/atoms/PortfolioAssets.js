import {atom, selector} from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {fetchWatchlistData} from "../context/CoinContext";
import axios from "axios";

export const portfolioBoughtAssetsState = selector({
    key: 'portfolioBoughtAssetsState',
    get: async () => {
        const jsonValue = await AsyncStorage.getItem('@portfolio-coins')
        return jsonValue !== null ? JSON.parse(jsonValue) : []
    }

})

export const boughtAssetsFromAPIState = selector({
    key: "boughtAssetsFromAPIState",
    get: async ({get}) => {
        const subscribeToLocalAssets = get(boughtAssetsFromLocalState)
        const ids = subscribeToLocalAssets.map(coin => coin.id).join()
        const portfolioAssets = await fetchWatchlistData(ids)
        const assets = subscribeToLocalAssets.map(asset => {
            const apiAssets = portfolioAssets.filter(item => asset.id === item.id)[0]
            return {
                ...asset,
                currentPrice: apiAssets.current_price,
                priceChangePercentage: apiAssets.price_change_percentage_24h
            }
        })
        return assets.sort((item1, item2) => {
            return (item1.currentPrice * item1.quantityBought) < (item2.currentPrice * item2.quantityBought)
        })
    }
})

export const refreshAssetsFromAPIState = selector({
    key: "refreshAssetsFromAPIState",
    get: async ({get}) => {
        const dataFromApi = await get(allPortfolioAssetsState);
        const ids = dataFromApi.map(coin => coin.id).join()
        const portfolioAssets = await fetchWatchlistData(ids)
        const newData = dataFromApi.map(coin => {
            const apiAssets = portfolioAssets.filter(item => coin.id === item.id)
            return apiAssets.map(value => ({
                ...coin,
                currentPrice: value.current_price,
                priceChangePercentage: value.price_change_percentage_24h
            }))
        })
        return newData.sort((item1, item2) => {
            return (item1.currentPrice * item1.quantityBought) < (item2.currentPrice * item2.quantityBought)
        })
    }
})
export const chartDataFetchState = selector({
    key: 'chartDataFetchState',
    get: async ({get}) => {
        const intervalState = get(charIntervalState)
        const {coin,interval}=intervalState
        //fetching prices for each coin

            const fetchPrices= async () => {
                const config = {
                    method: 'get',
                    url: `https://api.coingecko.com/api/v3/coins/${coin}/market_chart`,
                    params: {
                        vs_currency: 'usd',
                        days: interval,
                        interval: 'hourly'
                    },
                    headers: {
                        'accept': 'application/json'
                    }
                }

                try {
                    const response = await axios(config)
                    return response.data
                } catch (error) {
                    console.log(error)
                }
            }
            return fetchPrices()
    }
})

export const charIntervalState = atom({
    key: 'charIntervalState',
    default: {coin:'',interval:1}
})
export const chartPricesState=atom({
    key:'chartPricesState',
    default:chartDataFetchState
})

export const allRefreshDataFromAPIState = atom({
    key: 'allRefreshDataFromAPIState',
    default: refreshAssetsFromAPIState
})

export const allPortfolioAssetsState = atom({
    key: 'allPortfolioAssetsState',
    default: boughtAssetsFromAPIState
})

export const boughtAssetsFromLocalState = atom({
    key: 'boughtAssetsFromLocalState',
    default: portfolioBoughtAssetsState
})
