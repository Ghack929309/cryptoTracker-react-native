import {View, Text, Image, StyleSheet} from "react-native";
import tw from "tailwind-react-native-classnames";
import {AntDesign} from '@expo/vector-icons';

function CoinLayout({data}) {
    const beautifyInteger = (number) => {
        const trillion = 1_000_000_000_000
        const billion = 1_000_000_000
        const million = 1_000_000
        const thousand = 1_000
        if (number >= trillion) return `${Math.floor(number / trillion)} T`
        else if (number >= billion) return `${Math.floor(number / billion)} B`;
        else if (number >= million) return `${Math.floor(number / million)} M`;
        return `${Math.floor(number / thousand)} K`
    }
    const percentage = data.price_change_percentage_24h < 0
    const color = percentage ? '#ea3943' : '#16c784'
    const icon = percentage ? 'caretdown' : "caretup"
    return (
        <View style={[tw`flex-row`, {
            padding: 15,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: '#282828'
        }]}>
            {/*image*/}
            <View style={tw`justify-center`}>
                <Image style={tw`w-8 h-8`} source={{uri: data.image}}/>
            </View>
            {/*coin*/}
            <View style={tw`ml-3`}>
                <Text style={tw`font-bold text-white`}>{data.name}</Text>
                <View style={[tw`flex-row items-center`, {marginTop: 4}]}>
                    <View style={[tw`bg-gray-600 rounded-md`,{paddingHorizontal:6}]}>
                        <Text
                            style={tw`font-bold text-white`}>{data.market_cap_rank}</Text>
                    </View>
                    <Text
                        style={[tw`font-bold uppercase text-white`, {marginHorizontal: 4}]}>{data.symbol}</Text>
                    <AntDesign name={icon} style={{marginRight: 2}} size={12}
                               color={color}/>
                    <Text
                        style={{color: color}}>{data.price_change_percentage_24h.toFixed(2)}%</Text>
                </View>

                {/*   The chart will go here with the container view of flex-1 and
                    a justify between */}

            </View>

            {/*    market cap*/}
            <View style={tw`ml-auto flex-col self-center items-end`}>
                <Text
                    style={[tw`text-white  font-bold`, {marginBottom: 2}]}>{data.current_price}</Text>
                <Text
                    style={tw`text-white text-gray-500 tracking-tight text-xs`}>MCap {beautifyInteger(data.market_cap)}</Text>
            </View>
        </View>
    );
}

export default CoinLayout;