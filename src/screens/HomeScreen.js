import {
    FlatList,
    View,
    RefreshControl,
    VirtualizedList
} from 'react-native';
import {CoinProvider} from "../context/CoinContext";
import {memo, useContext, useEffect, useState} from "react";
import CoinLayout from "../components/homeComponents/cointLayout";
import tw from "tailwind-react-native-classnames";
import Filter from "../components/homeComponents/Header/Filter";
import Logo from "../components/homeComponents/Header/Logo";


function HomeScreen() {
    const {priceData, onRefreshScreen,dataWithPrice, loading} = useContext(CoinProvider);
    const [search, setSearch] = useState(false)
    const [input, setInput] = useState('')

    const getItemCount=(data)=>{
      return 10
    }
    const getItem=(data,index)=>{
       return data

    }

    return (
        <View style={tw`pb-4 flex-1`}>
            <Logo search={search} setSearch={setSearch} input={input}
                  setInput={setInput}/>
            <Filter/>
            <FlatList data={priceData}
                // onEndReached={()=>dataWithPrice((priceData.length/10)+1)}
                //              initialNumToRender={4}
                //              getItemCount={getItemCount}
                //              getItem={(data)=>getItem(data)}
                             refreshControl={
                                 <RefreshControl onRefresh={onRefreshScreen}
                                                 refreshing={loading} tintColor='white'/>
                             }
                             renderItem={({item}) => <CoinLayout allData={item}/>}/>
        </View>

    );
}


export default memo(HomeScreen);