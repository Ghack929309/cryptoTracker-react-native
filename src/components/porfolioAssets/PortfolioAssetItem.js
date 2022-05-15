import React from 'react';
import {Text, View, Image} from "react-native";
import tw from "tailwind-react-native-classnames";
import {AntDesign} from "@expo/vector-icons";

function PortfolioAssetItem({item}) {
    const {
        id,
        name,
        image,
        ticker,
        quantityBought,
        priceBought,
        currentPrice,
        priceChangePercentage
    } = item
    const color = priceChangePercentage < 0 ? '#ea3943' : '#16c784' || 'white'
    const icon = priceChangePercentage < 0 ? 'caretdown' : "caretup" || 'caretup'
    return (
        <View style={[tw`flex-row justify-center items-center bg-black`, {padding: 10}]}>
            <View>
                <Image source={{uri: image}}
                       style={{
                           width: 30,
                           height: 30,
                           marginRight: 10,
                           alignSelf: 'center'
                       }}/>
            </View>
            <View>
                <Text style={[tw`text-white font-bold`, {fontSize: 16}]}>{name}</Text>
                <Text style={tw`text-gray-400 `}>{ticker}</Text>
            </View>
            <View style={{marginLeft:'auto',alignItems:'flex-end'}}>
                <Text style={[tw`text-white`, {fontWeight: '600'}]}>${currentPrice?.toFixed(2)}</Text>
                <View style={tw`flex-row justify-end items-center`}>
                    <AntDesign name={icon}
                               style={{marginRight: 5, alignSelf: 'center'}}
                               size={10}
                               color={color}/>
                    <Text style={{
                        color: color,
                        fontWeight: '600',
                    }}>{priceChangePercentage?.toFixed(2)}</Text>
                </View>
            </View>
            <View style={{marginLeft: 'auto', alignItems: 'flex-end'}}>
                <Text
                    style={[tw`text-white font-bold`, {fontSize: 16}]}>${(quantityBought * currentPrice)?.toFixed(2)}</Text>
                <Text style={{
                    fontWeight: '600',
                    color: 'white'
                }}>{quantityBought} {ticker}</Text>
            </View>
        </View>
    );
}

export default PortfolioAssetItem;