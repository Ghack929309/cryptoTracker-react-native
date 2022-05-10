import {FlatList, View} from 'react-native';
import {CoinProvider} from "../context/CoinContext";
import {useContext} from "react";
import CoinLayout from "../components/cointLayout";
import SafeAreaView from 'react-native-safe-area-view';
import tw from "tailwind-react-native-classnames";


function HomeScreen() {
    const {marketData} = useContext(CoinProvider);
    return (

            <View>
                <FlatList data={marketData}
                          renderItem={({item}) => <CoinLayout data={item}/>}/>

            </View>

    );
}

export default HomeScreen;