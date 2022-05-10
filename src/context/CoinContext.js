import {createContext, useEffect, useState} from 'react';
import axios from 'axios'

export const CoinProvider = createContext(null)

function CoinContext({children}) {
    const [marketData,setMarketData]=useState([])

    useEffect(()=>{
        fetchData()
    },[])

    //fetching data
    const fetchData = () => {
        let config = {
            method: 'get',
            url: 'https://api.coingecko.com/api/v3/coins/markets',
            params:{
                vs_currency:'usd',
                order:'market_cap_desc',
                per_page:100,
                page:1,
                sparkline:false
            },
            headers: {
                'accept': 'application/json'
            }
        };
            try {
                axios(config)
                    .then(function (response) {
                        setMarketData(response.data)
                        console.log(JSON.stringify(response.data));
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }catch (error){
                console.log(error)
            }


    }

    return (
        <CoinProvider.Provider value={{fetchData,marketData}}>
            {children}
        </CoinProvider.Provider>
    );
}

export default CoinContext;