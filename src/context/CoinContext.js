import {createContext, useEffect, useState} from 'react';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CoinProvider = createContext(null)

// fetching current data for watch list
export function fetchWatchlistData(ids,page=1){
    const config={
        method:'get',
        url:'https://api.coingecko.com/api/v3/coins/markets',
        params: {
            vs_currency: 'usd',
            ids:ids,
            order: 'market_cap_desc',
            page: page,
            sparkline: false,
            price_change_percentage: '24h'
        },
        headers: {
            'accept': 'application/json'
        }
    }

    return new Promise((resolve,reject)=>{
        axios(config).then(response=>{
            return resolve(response.data)
        }).catch(e=> {
            reject(e)
            console.log(e)
        })
    })
}

function CoinContext({children}) {
    const [priceData, setPriceData] = useState([])
    const [loading, setLoading] = useState(false)
    const [watchlist, setWatchlist] = useState([])



    useEffect(() => {
        dataWithPrice()
        getDataFromLocal()

    }, [])
//getting data form local storage
    const getDataFromLocal = async () => {
        try {
            const response = await AsyncStorage.getItem('@watchlist')
            if (response !== null) {
                setWatchlist(JSON.parse(response))
            }
        } catch (e) {
            console.log(e)
        }
    }
    //storing data to local storage
    const storeCoinIdToLocal = async (coinId) => {
        try {
            const exist=watchlist?.some(id=>coinId===id)
            if(!exist){
                const add = [...watchlist, coinId]
                await AsyncStorage.setItem('@watchlist', JSON.stringify(add))
                setWatchlist(add)
            }

        } catch (e) {
            console.log(e)
        }
    }
    //remove coin from local storage
    const removeCoinFromLocal=async (coinId)=>{
        const removeId=watchlist.filter(id=>id!==coinId)
        await AsyncStorage.setItem('@watchlist',JSON.stringify(removeId))
        setWatchlist(removeId)
    }

    //fetching data fot all coins
    function fetchData(page = 1) {
        let config = {
            method: 'get',
            url: 'https://api.coingecko.com/api/v3/coins/markets',
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 20,
                page: page,
                sparkline: false,
                price_change_percentage: '24h'
            },
            headers: {
                'accept': 'application/json'
            }
        };
        try {
            return new Promise((res, rej) => {
                axios(config)
                    .then(function (response) {
                        return res(response.data)
                    })
                    .catch(function (error) {
                        console.log(error);
                        return rej(error)
                    });
            })

        } catch (error) {
            console.log(error)
        }
    }

    //fetching prices for each coin
    function fetchPrices(coin, days) {
        const config = {
            method: 'get',
            url: `https://api.coingecko.com/api/v3/coins/${coin}/market_chart`,
            params: {
                vs_currency: 'usd',
                days: days,
                interval: 'hourly'
            },
            headers: {
                'accept': 'application/json'
            }
        }

        try {
            return new Promise((res, rej) => {
                axios(config)
                    .then(function (response) {
                        return res(response.data)
                    })
                    .catch(function (error) {
                        console.log(error);
                        return rej(error)
                    });
            })

        } catch (error) {
            console.log(error)
        }
    }

    // restructure the data into array object coin with prices associated
    const dataWithPrice = async () => {
        setLoading(true)
        try {
            const cryptoData = await fetchData()
            cryptoData.map(async coin => {
                const price = await fetchPrices(coin.id, 1)
                setPriceData(prev => [...prev, {coin, price}])
                setLoading(false)
            })
        } catch (e) {
            console.log(e)
        }
    }
    //on refreshing the screen
    const onRefreshScreen = async () => {

        setLoading(true)
        // setPriceData([])
        try {
            fetchData().then(res => {
                let value = []
                res.map(coin => {
                    fetchPrices(coin.id, 1).then(price => {
                        value.push({coin, price})
                        setPriceData(value)
                        setLoading(false)
                    })

                })
            }).catch((e) => console.log(e))
        } catch (e) {
            console.log(e)
        }
    }
//fetching specific data for each coin id
    const getDetailCoin = (id) => {
        try {
            return new Promise((res, rej) => {
                axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`)
                    .then(response => {
                        return res(response.data)
                    }).catch((error) => {
                    return rej(error)
                })
            })
        } catch (e) {
            console.log(e)
        }
    }

    // get simple coin for portfolio
    const fetchAllCoin=async ()=>{

        try{
            const response=await axios.get('https://api.coingecko.com/api/v3/coins/list?include_platform=false')
            return response.data
        }catch (error) {
            console.log(error)
        }

    }
    return (
        <CoinProvider.Provider
            value={{
                priceData,
                getDetailCoin,
                fetchPrices,
                loading,
                watchlist,
                onRefreshScreen,
                dataWithPrice,
                storeCoinIdToLocal,
                removeCoinFromLocal,
                fetchWatchlistData,
                fetchAllCoin
            }}>
            {children}
        </CoinProvider.Provider>);
}

export default CoinContext;