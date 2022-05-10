import {View, Text, Dimensions,TextInput} from "react-native";
import Header from "../components/coinDetail/Header";
import coin from "../constant/crypto.json";
import tw from "tailwind-react-native-classnames";
import {AntDesign} from "@expo/vector-icons";
import {
    ChartDot,
    ChartPath,
    ChartPathProvider,
    ChartYLabel
} from "@rainbow-me/animated-charts";


function CoinDetail() {
    const {
        image: {small},
        name,
        prices,
        symbol,
        market_data: {market_cap_rank, current_price, price_change_percentage_24h}
    } = coin
    const {width: SIZE} = Dimensions.get('window');
    const percentage = price_change_percentage_24h < 0
    const icon = percentage ? 'caretdown' : "caretup"
    const color = percentage ? '#ea3943' : '#16c784'
    const points = prices.map(([x,y])=>({x,y}))
    const chartColor=current_price.usd > prices[0][1]?'#16c784':'#ea3943'
    //show the graph info base on ui
    const formatUI=(value)=>{
        //everything here is needed
        'worklet'
        if(value===""){
            return `$${current_price.usd.toFixed(2)}`
        }
        return `$${parseFloat(value).toFixed(2)}`
    }
    return (
        <View>
            <ChartPathProvider data={{ points, smoothingStrategy: 'bezier' }}>
            {/*HEADER*/}
            <Header small={small} symbol={symbol} market_cap_rank={market_cap_rank}/>

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
                        fontWeight: '600',
                        fontSize: 30,
                        letterSpacing: 1
                    }]}
                    />
                </View>
                <View style={[tw`text-white flex-row rounded-xl items-center`,{padding:8,backgroundColor:color}]}>
                    <AntDesign name={icon} style={{marginRight: 4}} size={12}
                               color={'white'}/>
                    <Text
                        style={[tw`text-white`, {
                            fontSize: 17,
                            fontWeight: '500'
                        }]}>{price_change_percentage_24h.toFixed(2)}%</Text>
                </View>
            </View>

        {/*    chart section */}

                <View>
                    <ChartPath strokeWidth={2} height={SIZE / 2} stroke={chartColor} width={SIZE} />
                    <ChartDot style={{ backgroundColor:chartColor }} />
                </View>
        {/*    Converter section */}
                <View style={tw`flex-row justify-between`}>
                    <View>
                        <Text style={tw`text-white uppercase font-bold`}>{symbol}</Text>
                        <TextInput />
                    </View>
                    <View>
                        <Text style={tw`text-white font-bold`}>USD</Text>
                        <TextInput />
                    </View>
                </View>
                </ChartPathProvider>

        </View>
    );
}

export default CoinDetail;