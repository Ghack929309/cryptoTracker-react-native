import {createContext, useEffect, useState} from 'react';
import axios from 'axios'

export const CoinProvider = createContext(null)

function CoinContext({children}) {
    const [priceData, setPriceData] = useState([])

    useEffect(() => {
        dataWithPrice()
    }, [])

    //fetching data
    function fetchData() {
        let config = {
            method: 'get',
            url: 'https://api.coingecko.com/api/v3/coins/markets',
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 10,
                page: 1,
                sparkline: false
            },
            headers: {
                'accept': 'application/json'
            }
        };
        try {
            return new Promise((res,rej)=>{
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
    function fetchPrices(coin, days){
        const config = {
            method: 'get',
            url: `https://api.coingecko.com/api/v3/coins/${coin}/market_chart`,
            params: {
                vs_currency: 'usd',
                days: days,
            },
            headers: {
                'accept': 'application/json'
            }
        }

        try {
            return new Promise((res,rej)=>{
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
    const dataWithPrice = () => {
        try {
            fetchData().then(res=>{
                res.map(coin=>{
                    fetchPrices(coin.id,2).then(price=>{

                        setPriceData(prev=>{
                            return [...prev,{coin,price}]
                        })
                    })
                })
            }).catch((e)=>console.log(e))
        }catch (e) {
            console.log(e)
        }
    }

    // console.log('state value stored',priceData)
    return (
        <CoinProvider.Provider value={{ priceData}}>
            {children}
        </CoinProvider.Provider>
    );
}

export default CoinContext;