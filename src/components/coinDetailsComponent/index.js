import React, {memo, Suspense, useContext, useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import {
    ChartDot, ChartPath, ChartPathProvider, ChartYLabel
} from "@rainbow-me/animated-charts";
import Header from "./header";
import tw from "tailwind-react-native-classnames";
import {AntDesign} from "@expo/vector-icons";
import Filter from "./filter";
import {useRecoilState, useRecoilValue} from "recoil";
import {charIntervalState, chartPricesState} from "../../atoms/PortfolioAssets";
import {CoinProvider} from "../../context/CoinContext";
import {useRoute} from "@react-navigation/native";

function SplitCoinDetails() {

    const prices = useRecoilValue(chartPricesState)
    const [interval, setInterval] = useRecoilState(charIntervalState)
    const {getDetailCoin, fetchPrices} = useContext(CoinProvider);
    const [coinData, setCoinData] = useState({})
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
            setLoading(false)
        }).catch((error) => console.log(error))
    }, [])
    console.log('rerender')
    //fetch prices
    useEffect(() => {
        setInterval({coin: coinId.coinId, interval: 1})
    }, [])

    // on loading stage
    if (loading || coinData.image === undefined) {
        return (<ActivityIndicator style={tw`pt-20`} size='large'/>)
    }
    const {
        image: {small},
        name,
        id,
        symbol,
        market_data: {market_cap_rank, current_price, price_change_percentage_24h}
    } = coinData


    const points = prices?.prices?.map(([x, y]) => ({x, y}))
    const percentage = price_change_percentage_24h < 0
    const chartColor = percentage ? '#ea3943' : '#16c784' || 'white'
    const color = percentage ? '#ea3943' : '#16c784' || 'white'
    const icon = percentage ? 'caretdown' : "caretup" || 'caretup'

    //show the graph info base on ui
    const formatUI = (value) => {
        //everything here is needed
        'worklet'
        if (value === "") {
            if (value < 1) {
                return `$${current_price.usd}`
            }
            return `$${current_price.usd.toFixed(2)}`
        }
        if (value < 1) {
            return `$${parseFloat(value)}`
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
            <Header small={small} id={id} symbol={symbol}
                    market_cap_rank={market_cap_rank}/>

            {/*coin section TODO IF THE COMPONENT GET TO BIG, PUT THIS SECTION TO
             ANOTHER COMPONENT*/}
            <View
                style={[tw`flex-row justify-between items-center`, {padding: 15}]}>
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
            {/*filter section*/}
            <Suspense fallback={<ActivityIndicator size='large'/>}>
                <Filter id={id}/>
            </Suspense>
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

    </View>)
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

export default SplitCoinDetails;