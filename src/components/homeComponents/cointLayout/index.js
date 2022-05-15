import {View, Text, Image, StyleSheet, Pressable} from "react-native";
import tw from "tailwind-react-native-classnames";
import {AntDesign} from '@expo/vector-icons';
import {ChartDot, ChartPath, ChartPathProvider} from "@rainbow-me/animated-charts";
import {useNavigation} from "@react-navigation/native";


function CoinLayout({allData}) {
    const data = allData.coin
    const navigation = useNavigation()
    const beautifyInteger = (number) => {
        const trillion = 1e12
        const billion = 1e9
        const million = 1e6
        const thousand = 1e3
        if (number >= trillion) return `${(number / trillion).toFixed(3)} Tn`
        else if (number >= billion) return `${(number / billion).toFixed(3)} Bn`;
        else if (number >= million) return `${(number / million).toFixed(3)} Mn`;
        return `${(number / thousand).toFixed(3)} K`
    }
    const percentage = data.price_change_percentage_24h < 0
    const color = percentage ? '#ea3943' : '#16c784'||'white'
    const icon = percentage ? 'caretdown' : "caretup"||'caretup'
    const SIZE = 75;
    const points = allData.price?.prices?.map(([x, y]) => ({x, y}))
    const chartColor = percentage ?  '#ea3943':'#16c784'||'white'

    return (
        <Pressable onPress={() => navigation.navigate('CoinDetail', {
            coinId: data.id
        })}
                   style={[tw`flex-row justify-between`, {
                       padding: 15,
                       borderBottomWidth: StyleSheet.hairlineWidth,
                       borderBottomColor: '#282828'
                   }]}>

            <ChartPathProvider data={{points, smoothingStrategy: 'bezier'}}>
                {/*image*/}
                <View style={tw`justify-center`}>
                    <Image style={tw`w-8 h-8`} source={{uri: data.image}}/>
                </View>
                {/*coin*/}
                <View style={tw`ml-3`}>
                    <Text style={tw`font-bold text-white`}>{data.name}</Text>
                    <View style={[tw`flex-row items-center`, {marginTop: 4}]}>
                        <View
                            style={[tw`bg-gray-600 rounded-md`, {paddingHorizontal: 6}]}>
                            <Text
                                style={tw`font-bold text-white`}>{data.market_cap_rank}</Text>
                        </View>
                        <Text
                            style={[tw`font-bold uppercase text-white`, {marginHorizontal: 4}]}>{data.symbol}</Text>
                        <AntDesign name={icon} style={{marginRight: 2}} size={10}
                                   color={color}/>
                        <Text
                            style={{color: color}}>{data.price_change_percentage_24h.toFixed(2)}%</Text>
                    </View>

                </View>

                {/*   The chart section */}

                <View style={tw` ml-3 flex-1 items-start justify-center`}>
                    <ChartPath height={30} stroke={chartColor} width={SIZE}/>
                    <ChartDot style={{backgroundColor: chartColor}}/>
                </View>

                {/*    market cap*/}
                <View style={tw`ml-auto flex-col self-center items-end`}>
                    <Text
                        style={[tw`text-white  font-bold`, {marginBottom: 2}]}>{data.current_price}</Text>
                    <Text
                        style={tw`text-white text-gray-500 tracking-tight text-xs`}>MCap {beautifyInteger(data.market_cap)}</Text>
                </View>
            </ChartPathProvider>
        </Pressable>
    );
}

export default CoinLayout;