import {
    View,
    Text,
    Dimensions,
    TextInput,
    StyleSheet,
    ActivityIndicator
} from "react-native";
import Header from "../components/coinDetailsComponent/header";
import coin from "../constant/crypto.json";
import tw from "tailwind-react-native-classnames";
import {AntDesign} from "@expo/vector-icons";
import {
    ChartDot, ChartPath, ChartPathProvider, ChartYLabel
} from "@rainbow-me/animated-charts";
import {useContext, useEffect, useState} from "react";
import {useRoute} from "@react-navigation/native";
import {CoinProvider} from "../context/CoinContext";


function CoinDetail() {
    const {getDetailCoin, fetchPrices} = useContext(CoinProvider);
    const [coinData, setCoinData] = useState({})
    const [pricesData, setPricesData] = useState([])
    const [loading, setLoading] = useState(false)
    const route = useRoute()
    const {params: coinId} = route
    const [coinValue, setCoinValue] = useState('1');
    const [currencyValue, setCurrencyValue] = useState('')
    const {width: SIZE} = Dimensions.get('window');


    //fetching data for the specific coin

    useEffect(() => {
        setLoading(true)
        getDetailCoin(coinId.coinId).then((res) => {
            setCoinData(res)
            setCurrencyValue(res.market_data?.current_price?.usd?.toString())
            fetchPrices(coinId.coinId, 1).then((res) => {
                setPricesData(res)
            })
            setLoading(false)
        }).catch((error) => console.log(error))
    }, [])

    // on loading stage
    if (loading || coinData.image === undefined  ) {
        return (<ActivityIndicator style={tw`pt-20`} size='large'/>)
    }
    const {
        image: {small},
        name,
        id,
        symbol,
        market_data: {market_cap_rank, current_price, price_change_percentage_24h}
    } = coinData

    const points = pricesData?.prices?.map(([x, y]) => ({x, y}))
    const percentage = price_change_percentage_24h < 0
    const chartColor =percentage ? '#ea3943' : '#16c784'||'white'
    const color = percentage ? '#ea3943' : '#16c784'||'white'
    const icon = percentage ? 'caretdown' : "caretup"||'caretup'

    //show the graph info base on ui
    const formatUI = (value) => {
        //everything here is needed
        'worklet'
        if (value === "") {
            return `$${current_price.usd.toFixed(2)}`
        }
        return `$${parseFloat(value).toFixed(2)}`
    }

    const changeCoin = (value) => {
        setCoinValue(value)
        const floatInput = parseFloat(value.replace(',', '.')) || 0
        setCurrencyValue((floatInput * current_price.usd).toString())
    }
    const changeCurrency = (value) => {
        setCurrencyValue(value)
        const floatInput = parseFloat(value.replace(',', '.')) || 0
        setCoinValue((floatInput / current_price.usd).toString())
    }
    return (<View>
        <ChartPathProvider data={{points, smoothingStrategy: 'bezier'}}>
            {/*HEADER*/}
            <Header small={small} id={id} symbol={symbol} market_cap_rank={market_cap_rank}/>

            {/*coin section TODO IF THE COMPONENT GET TO BIG, PUT THIS SECTION TO
             ANOTHER COMPONENT*/}
            <View style={[tw`flex-row justify-between items-center`, {padding: 15}]}>
                <View>
                    <Text style={tw`text-white`}>
                        {name}
                    </Text>
                    {/*display price base on chart point*/}
                    <ChartYLabel
                        format={formatUI}
                        style={[tw`text-white`, {
                            fontWeight: '600', fontSize: 30, letterSpacing: 1
                        }]}
                    />
                </View>
                <View style={[tw`text-white flex-row rounded-xl items-center`, {
                    padding: 8, backgroundColor: color
                }]}>
                    <AntDesign name={icon} style={{marginRight: 4}} size={10}
                               color={'white'}/>
                    <Text
                        style={[tw`text-white`, {
                            fontSize: 17, fontWeight: '500'
                        }]}>{price_change_percentage_24h.toFixed(2)}%</Text>
                </View>
            </View>

            {/*    chart section */}

            <View>
                <ChartPath strokeWidth={2} height={SIZE / 2} stroke={chartColor}
                           width={SIZE}/>
                <ChartDot style={{backgroundColor: chartColor}}/>
            </View>
            {/*    Converter section */}
            <View style={tw`flex-row `}>
                <View style={tw`flex-1  flex-row `}>
                    <Text
                        style={tw`text-white  self-center uppercase font-bold`}>{symbol}</Text>
                    <TextInput style={styles.input} placeholder={'Amount'}
                               value={coinValue}
                               onChangeText={(value) => changeCoin(value)}
                               keyBoardType='numeric'
                    />
                </View>
                <View style={tw`flex-1 flex-row `}>
                    <Text style={tw`text-white self-center  font-bold`}>USD</Text>
                    <TextInput style={styles.input} placeholder={'Amount'}
                               value={currencyValue}
                               onChangeText={(value) => changeCurrency(value)}
                               keyBoardType='numeric'
                    />
                </View>
            </View>
        </ChartPathProvider>

    </View>);
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        height: 40,
        margin: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        padding: 10,
        color: 'white',
        fontSize: 16

    }
})
export default CoinDetail;