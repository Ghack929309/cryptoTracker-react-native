import React from 'react';
import {CandlestickChart} from 'react-native-wagmi-charts';
import { StyleSheet, Text, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import * as haptics from 'expo-haptics';

function PremiumChart({SIZE, chartData,premiumDataPoints}) {
    console.log(chartData)

    function invokeHaptic() {
        haptics.impactAsync(haptics.ImpactFeedbackStyle.Light);
    }

    return (
        <CandlestickChart.Provider data={premiumDataPoints}>
            <View>
                <CandlestickChart height={SIZE / 2} width={SIZE}>
                    <CandlestickChart.Candles/>
                    <CandlestickChart.Crosshair onCurrentXChange={invokeHaptic}>
                        <CandlestickChart.Tooltip textStyle={{color: 'white'}}/>
                    </CandlestickChart.Crosshair>
                </CandlestickChart>
                {/*tooltip section*/}
                <View style={tw`flex-row justify-between mx-2 my-2`}>
                    <View>
                        <Text style={styles.tooltipHeader}>Open</Text>
                        <CandlestickChart.PriceText
                            style={styles.tooltip} type='open'/>
                    </View>
                    <View>
                        <Text style={styles.tooltipHeader}>High</Text>
                        <CandlestickChart.PriceText
                            style={styles.tooltip} type='high'/>
                    </View>
                    <View>
                        <Text style={styles.tooltipHeader}>Low</Text>
                        <CandlestickChart.PriceText
                            style={styles.tooltip} type='low'/>
                    </View>
                    <View>
                        <Text style={styles.tooltipHeader}>Close</Text>
                        <CandlestickChart.PriceText
                            style={styles.tooltip} type='close'/>
                    </View>
                </View>

                <CandlestickChart.DatetimeText
                    style={[styles.tooltip, {margin: 10}]}/>

            </View>
        </CandlestickChart.Provider>
    )
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
    },
    tooltip: {color: 'white', fontWeight: '700'},
    tooltipHeader: {
        color: 'gray',
        fontSize: 13
    }
})
export default PremiumChart;