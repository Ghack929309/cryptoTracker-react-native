import React, {useContext, Suspense, useEffect, useState, useMemo, memo} from 'react';
import {
    FlatList,
    ActivityIndicator,
    RefreshControl, View, Text,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import {CoinProvider} from "../context/CoinContext";
import CoinLayout from "../components/homeComponents/cointLayout";


function WatchList() {
    const {watchlist, fetchWatchlistData, fetchPrices} = useContext(CoinProvider);
    const [loading, setLoading] = useState(false)
    const [watchlistData, setWatchlistData] = useState([])
    const ids = watchlist.join()

    useMemo(() => {
        if (watchlist.length !== 0) {
            getData(ids)
        }
    }, [watchlist])

    async function getData(ids) {
        try {
            setLoading(true)
            setWatchlistData([])
            const response = await fetchWatchlistData(ids)
            response.map(async coin => {
                const price = await fetchPrices(coin.id, 1)
                setWatchlistData(prev => [...prev, {coin, price}])
            })
            setLoading(false)
        } catch (error) {
            if (error) {
                console.log('there is an error', error)
            }
        }
    }

    if (loading) return (<ActivityIndicator size='large'/>)
    if (watchlist.length === 0) return (
        <View><Text style={tw`text-gray-400 mt-12 font-semibold text-xl self-center`}>No
            Data</Text></View>)

    return (
        <FlatList data={watchlistData}
                  refreshControl={
                      <RefreshControl
                          refreshing={loading}
                          tintColor='white'
                          onRefresh={() => getData(ids)}
                      />
                  }
                  renderItem={({item}) => (
                      <CoinLayout allData={item}/>
                  )}/>
    );
}

export default WatchList;