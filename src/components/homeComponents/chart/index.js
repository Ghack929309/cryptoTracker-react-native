import React from 'react';
import {View} from "react-native";
import {LineChart} from "react-native-wagmi-charts";
import {useRecoilValue} from "recoil";
import {getCoinPriceSelector} from "../atom";

function Index({id,SIZE,chartColor}) {
    const prices = useRecoilValue(getCoinPriceSelector({coin:id,day:1}))
    if(prices.length === 0) return
    const points = prices?.prices?.map(([timestamp, value]) => ({timestamp, value}))
    return (
        <LineChart.Provider data={points}>
        <View style={{marginLeft:'auto',alignSelf:'flex-end',justifyItems:'flex-end'}}>
            <LineChart height={20} width={SIZE}>
                <LineChart.Path color={chartColor}>
                    <LineChart.Gradient/>
                </LineChart.Path>
                {/*<LineChart.CursorCrosshair color={color}/>*/}
            </LineChart>
        </View>
          </LineChart.Provider>
    );
}

export default Index;