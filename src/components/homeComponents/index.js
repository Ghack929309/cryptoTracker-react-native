import React, {useEffect} from 'react';
import {ActivityIndicator, RefreshControl, VirtualizedList} from "react-native";
import CoinLayout from "./cointLayout";
import {useRecoilRefresher_UNSTABLE, useRecoilValue, useSetRecoilState} from "recoil";
import {
    getCoinDataAtom, getCoinPageAtom,
} from "./atom";

function CoinList() {
    const data = useRecoilValue(getCoinDataAtom)
    console.log('coinList render')
    useEffect(()=>{if(!data)return},[])
    const setPage = useSetRecoilState(getCoinPageAtom)
    // const refresh = useRecoilRefresher_UNSTABLE(gettingDataWithPriceSelector)

    const getItemCount = (data) => {
        return data.length
    }
    const getItem = (data, index) => {
        return data[index]

    }
    return (
        <VirtualizedList data={data}
            // onEndReached={() => setPage(prev=>prev+1)}
                         initialNumToRender={10}
                         keyExtractor={(item) => item.id}
                         getItemCount={getItemCount}
                         getItem={getItem}
                         // refreshControl={
                         //     <RefreshControl onRefresh={refresh}
                         //                     tintColor='white'/>
                         // }
                         renderItem={({item}) => <CoinLayout key={item.id}
                                                             allData={item}/>}
                         ListFooterComponent={
                             <ActivityIndicator  size={'large'}/>
                         }

        />
    );
}

export default CoinList