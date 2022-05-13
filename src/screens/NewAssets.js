import React, {useState} from 'react';
import {Text, TextInput, View, StyleSheet, Pressable} from "react-native";
import SearchableDropDown from "react-native-searchable-dropdown";
import tw from "tailwind-react-native-classnames";
import {useNavigation} from "@react-navigation/native";
import {FontAwesome} from "@expo/vector-icons";


function NewAssets() {
    const navigation = useNavigation()
    const [assetQuantity, setAssetQuantity] = useState('')
    return (
        <View style={tw`flex-1`}>
            <SearchableDropDown
                items={[]}
                onItemSelect={({item}) => console.log(item)}
                containerStyle={styles.container}
                itemStyle={styles.item}
                itemTextStyle={{color: 'white'}}
                resetValue={false}
                placeholder={"Select a coin..."}
                placeholderTextColor='white'
                textInputProps={{
                    underlineColorAndroid: 'transparent',
                    style: styles.inputProps
                }}
            />
            <View style={[tw`flex-row items-start flex-1`, {marginTop: 50}]}>
                <View
                    style={[tw`flex-col items-end justify-center`, {width: '70%'}]}>
                    <View style={tw`flex-row`}>
                        <TextInput value={assetQuantity}
                                   style={{color: 'white', fontSize: 90}}
                                   placeholder='0'
                                   keyboardType='numeric'
                                   onChangeText={(text) => setAssetQuantity(text)}/>
                        <Text style={styles.coinName}>BTC</Text>
                    </View>
                    <Text style={styles.perCoin}>$30000 per coin</Text>
                </View>
                <View style={tw`self-start mt-10 items-center flex-1`}>
                    <View style={tw`pl-4 items-center`}>
                        <FontAwesome name="exchange" style={{transform: [{ rotate: '90deg'}]}} size={25} color="#444444"/>
                        <Text style={[tw`font-semibold mt-2`,{color:'#535252'}]}>USD</Text>
                    </View>
                </View>
            </View>
            <Pressable onPress={() => navigation.navigate('AddNewAsset')}
                       style={styles.bottomContainer}>
                <Text style={styles.bottomText}>Add new Assets</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    item: {
        padding: 10,
        marginTop: 2,
        backgroundColor: '#1e1e1e',
        borderWidth: 1,
        borderColor: '#444444',
        borderRadius: 5
    },
    inputProps: {
        padding: 12,
        borderWidth: 1.5,
        borderColor: '#444444',
        borderRadius: 5,
        backgroundColor: '#1e1e1e',
        color: 'white'
    },
    coinName: {
        color: 'gray',
        fontWeight: '700',
        fontSize: 20,
        marginTop: 25,
        marginLeft: 5
    },
    bottomContainer: {
        backgroundColor: '#4961E1',
        padding: 10,
        alignItems: 'center',
        marginVertical: 30,
        marginHorizontal: 20,
        borderRadius: 5
    },
    bottomText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '600'
    },
    perCoin:{
        color:'#535252',
        fontSize:19,
        fontWeight:'500',
        letterSpacing:.5
    }
})

export default NewAssets;