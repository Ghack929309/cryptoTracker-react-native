import React, {useContext, useEffect, useState} from 'react';
import {
    FlatList,
    ActivityIndicator,
    RefreshControl,
    Text,
    View,
    RefreshControlComponent
} from "react-native";
import tw from "tailwind-react-native-classnames";
import {CoinProvider} from "../context/CoinContext";
import CoinLayout from "../components/homeComponents/cointLayout";


function WatchList() {
    const {watchlist, fetchWatchlistData, fetchPrices} = useContext(CoinProvider);
    const [loading, setLoading] = useState(false)
    const [watchlistData, setWatchlistData] = useState([])
    const ids =  watchlist.join()

    useEffect(() => {
        getData(ids)
    }, [watchlist])

    const getData = async (ids) => {
        setLoading(true)
        setWatchlistData([])
        const response = await fetchWatchlistData(ids)
        response.map(async coin => {
            const price = await fetchPrices(coin.id, 1)
            setWatchlistData(prev => [...prev, {coin, price}])
        })
        setLoading(false)
    }

    if (loading) return (<ActivityIndicator size='large'/>)

    return (
        <FlatList data={watchlistData}
                  refreshControl={
            <RefreshControl
                refreshing={loading}
                tintColor='white'
                onRefresh={()=> getData(ids)}
            />
                  }
                  renderItem={({item}) => <CoinLayout allData={item}/>}/>
    );
}

export default WatchList;