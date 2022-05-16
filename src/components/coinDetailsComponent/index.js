import React, {useEffect, useState, useContext, Suspense} from 'react';
import StandardChart from "./standartChart";
import {useRecoilState, useRecoilValue} from "recoil";
import {charIntervalState, chartPricesState} from "../../atoms/PortfolioAssets";
import {CoinProvider} from "../../context/CoinContext";
import {useRoute} from "@react-navigation/native";
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import tw from "tailwind-react-native-classnames";
import PremiumChart from "./premiumChart";
import Header from "./header";
import {LineChart} from "react-native-wagmi-charts";
import {AntDesign} from "@expo/vector-icons";
import Filter from "./filter";

function ChartSelector() {
    const prices = useRecoilValue(chartPricesState)
    const [interval, setInterval] = useRecoilState(charIntervalState)
    const {getDetailCoin, candleChartData} = useContext(CoinProvider);
    const [chartData, setCharData] = useState([])
    const [toggle, setToggle] = useState(true)
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
    //fetch prices
    //TODO IMPLEMENT SKELETON ON FILTER PRICES DATA
    useEffect(() => {
        setInterval({coin: coinId.coinId, interval: 1})
    }, [])
    //premium chart fetch data
    useEffect(() => {
        fetchCandleChart()
    }, [])

    const fetchCandleChart = async () => {
        const data = await candleChartData(interval)
        setCharData(data)
    }

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

    const premiumDataPoints = chartData?.map(([timestamp, open, high, low, close]) => ({
        timestamp,
        open,
        high,
        low,
        close
    }))
    const points = prices?.prices?.map(([timestamp, value]) => ({timestamp, value}))
    const percentage = price_change_percentage_24h < 0
    const color = percentage ? '#ea3943' : '#16c784' || 'white'
    const icon = percentage ? 'caretdown' : "caretup" || 'caretup'

    //show the graph info base on ui
    const formatUI = ({value}) => {
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

    return (
        <View>
            <LineChart.Provider data={points}>
                {/*HEADER*/}
                <Header small={small} id={id} symbol={symbol}
                        market_cap_rank={market_cap_rank}/>

                {/*coin section TODO IF THE COMPONENT GET TO BIG, PUT THIS SECTION TO
             ANOTHER COMPONENT*/}
                <View style={[tw`flex-row justify-between items-center`, {padding: 15}]}>
                    <View>
                        <Text style={tw`text-white`}>
                            {name}
                        </Text>
                        {/*display price base on chart point*/}

                        <LineChart.PriceText format={formatUI} style={[tw`text-white`, {
                            fontWeight: '600', fontSize: 30, letterSpacing: 1
                        }]}/>

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
                    <Filter id={id} toggle={toggle} setToggle={setToggle} color={color}/>
                </Suspense>
                {/*chart display base on toggle*/}
                {
                    toggle ? (<StandardChart SIZE={SIZE} color={color}/>) : (
                        <PremiumChart chartData={chartData}
                                      premiumDataPoints={premiumDataPoints}
                                      SIZE={SIZE}/>)}
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
            </LineChart.Provider>
        </View>
    );
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

export default ChartSelector;