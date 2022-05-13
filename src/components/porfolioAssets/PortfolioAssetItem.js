import React from 'react';
import {Text, View, Image} from "react-native";
import tw from "tailwind-react-native-classnames";
import {AntDesign} from "@expo/vector-icons";

function PortfolioAssetItem() {
    return (
        <View style={[tw`flex-row justify-center items-center`, {padding: 10}]}>
            <View>
                <Image source={{uri: ''}} style={{width: 30, height: 30}}/>
            </View>
            <View>
                <Text style={[tw`text-white font-bold`,{fontSize:16}]}>Bitcoin</Text>
                <Text style={tw`text-gray-400 `}>BTC</Text>
            </View>
            <View style={{marginLeft:'auto'}}>
                <Text style={[tw`text-white`,{fontWeight:'600'}]}>$4000</Text>
                <View style={tw`flex-row`}>
                    <AntDesign name='caretup' style={{marginRight: 5,alignSelf:'center'}}
                               size={10}
                               color="#16c764"/>
                    <Text style={[tw`text-white`,{color:'#16c764',fontWeight:'600'}]}>1.2</Text>
                </View>
            </View>
            <View style={{marginLeft:'auto',alignItems:'flex-end'}}>
                <Text style={[tw`text-white font-bold`,{fontSize:16}]}>$8000</Text>
                <Text style={{fontWeight:'600',color:'white'}}>2 BTC</Text>
            </View>
        </View>
    );
}

export default PortfolioAssetItem;