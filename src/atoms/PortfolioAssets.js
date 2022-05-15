import {atom, selector} from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {fetchWatchlistData} from "../context/CoinContext";
import axios from "axios";

// fetching coin list form local storage
export const portfolioBoughtAssetsState = selector({
    key: 'portfolioBoughtAssetsState',
    get: async () => {
        const jsonValue = await AsyncStorage.getItem('@portfolio-coins')
        return jsonValue !== null ? JSON.parse(jsonValue) : []
    }

})

// selector update the coin list on local storage with new data
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
// chart state
export const charIntervalState = atom({
    key: 'charIntervalState',
    default: {coin:'',interval:1}
})
//storing information after fetching base on chart state
export const chartPricesState=atom({
    key:'chartPricesState',
    default:chartDataFetchState
})

// store of updated data from the local storage
export const allPortfolioAssetsState = atom({
    key: 'allPortfolioAssetsState',
    default: boughtAssetsFromAPIState
})
// store of data from the local storage
export const boughtAssetsFromLocalState = atom({
    key: 'boughtAssetsFromLocalState',
    default: portfolioBoughtAssetsState
})
