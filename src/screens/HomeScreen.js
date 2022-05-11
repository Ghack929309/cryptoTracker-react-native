import {
    FlatList,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native';
import {CoinProvider} from "../context/CoinContext";
import {useContext, useEffect, useState} from "react";
import CoinLayout from "../components/cointLayout";
import {Ionicons} from '@expo/vector-icons';
import tw from "tailwind-react-native-classnames";


function HomeScreen() {
    const {priceData} = useContext(CoinProvider);
    const [search, setSearch] = useState(false)
    const [input,setInput]=useState('')
    console.log(priceData)
    return (

        <View style={tw`pb-4 flex-1`}>
                            {/*Header*/}
            {
                search ? (
                    <View style={tw`flex-row p-4 items-center justify-center`}>
                        <TextInput
                            style={[tw`text-white border-white text-sm border-2 flex-1 p-3 rounded-xl`]}
                            placeholderTextColor="gray"
                            value={input} onChangeText={(text)=>setInput(text)} placeholder='Search coin'/>
                        <TouchableOpacity onPress={() => setSearch(!search)}
                                          style={tw`ml-3 `}>
                            <Text style={tw`text-white`}>cancel</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={tw`flex-row justify-between p-4`}>
                        <Text
                            style={tw`text-white font-bold text-xl`}>CryptoTracker</Text>
                        <TouchableOpacity onPress={() => setSearch(!search)}>
                            <Ionicons name="md-search-outline" size={25} color="white"/>
                        </TouchableOpacity>
                    </View>
                )
            }
                         {/*Filter section*/}

            <View style={tw`px-5 flex-row justify-between mb-4 pb-2`}>
                <View
                    style={[tw`justify-center bg-gray-800 items-center flex-row rounded-xl`, styles.filterCenter]}>
                    <Ionicons name="ios-star-outline" style={tw`self-center`}
                              size={20}
                              color="white"/>
                </View>
                <View
                    style={[tw`justify-center items-center bg-gray-800  rounded-xl`, styles.filterCenter]}>
                    <Text
                        style={tw`text-white font-semibold tracking-tight text-sm`}>My
                        Watchlist</Text>
                </View>
                <View
                    style={[tw`justify-center items-center bg-gray-800  rounded-xl`, styles.filterCenter]}>
                    <Text
                        style={tw`text-white font-semibold tracking-tight text-sm`}>USD</Text>
                </View>
                <View
                    style={[tw`justify-center items-center bg-gray-800  rounded-xl`, styles.filterCenter]}>
                    <Text
                        style={tw`text-white font-semibold tracking-tight text-sm`}>Sort
                        by Rank</Text>
                </View>
            </View>
                         {/*Crypto layout*/}

            <FlatList data={priceData}
                      renderItem={({item}) => <CoinLayout allData={item}/>}/>

        </View>

    );
}

const styles = StyleSheet.create({
    filterCenter: {
        paddingVertical: 3,
        paddingHorizontal:15
    }
})
export default HomeScreen;