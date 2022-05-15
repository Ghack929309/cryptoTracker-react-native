import React, {useState} from 'react';
import {FlatList, Text, View, StyleSheet, Pressable, RefreshControl} from "react-native";
import tw from "tailwind-react-native-classnames";
import {AntDesign, EvilIcons} from "@expo/vector-icons";
import PortfolioAssetItem from "./PortfolioAssetItem";
import {useNavigation} from "@react-navigation/native";
import {useRecoilState, useRecoilValue} from "recoil";
import {
    allPortfolioAssetsState, boughtAssetsFromAPIState, boughtAssetsFromLocalState
} from "../../atoms/PortfolioAssets";
import {SwipeListView} from 'react-native-swipe-list-view';
import AsyncStorage from "@react-native-async-storage/async-storage";

function PortfolioAssetsList() {
    const navigation = useNavigation()
    const updateValue = useRecoilValue(boughtAssetsFromAPIState)
    const [assets, setAssets] = useRecoilState(allPortfolioAssetsState)
    const [assetsInLocal, setAssetsInLocal] = useRecoilState(boughtAssetsFromLocalState)

    const currentBalance = assets.reduce((total, price) => {
        return total + (price.currentPrice * price.quantityBought)
    }, 0)
    const boughtValue = assets.reduce((total, price) => {
        return total + (price.priceBought * price.quantityBought)
    }, 0)
    const percentageValue = ((currentBalance - boughtValue) / boughtValue) * 100 || 0
    const color = percentageValue < 0 ? '#ea3943' : '#16c784' || 'white'
    const icon = percentageValue < 0 ? 'caretdown' : "caretup" || 'caretup'

//TODO IMPLEMENT REFRESH ON PORTFOLIO

    const onRefresh = async () => {
        try {
            console.log('the update value', updateValue)
            // await AsyncStorage.setItem('@portfolio-coins', JSON.stringify(updateValue))
            // setAssetsInLocal(updateValue)
            // console.log('the value from the assets',assets)
        } catch (error) {
            console.log(error)
        }
    }
    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = async (rowMap, rowKey) => {
        try {
            closeRow(rowMap, rowKey);
            const newData = [...assets];
            const prevIndex = assets.findIndex(item => item.key === rowKey);
            newData.splice(prevIndex, 1);
            await AsyncStorage.setItem('@portfolio-coins', JSON.stringify(newData))
            setAssetsInLocal(newData);
        } catch (error) {
            console.log(error)

        }
    };

    return (

        <SwipeListView data={assets}
                       refreshControl={<RefreshControl
                           tintColor='white'
                           onRefresh={onRefresh}
                       />}
                       leftOpenValue={75}
                       disableRightSwipe
                       rightOpenValue={-75}
                       renderHiddenItem={(data, rowMap) => {
                           return (
                               <View style={tw`flex-1 items-end`}>
                                   <Pressable
                                       onPress={() => deleteRow(rowMap, data.item.key)}
                                       style={[tw`flex-1 justify-center px-6`, {backgroundColor: '#ea3943'}]}>
                                       <EvilIcons name="trash" size={30} color="white"/>
                                   </Pressable>
                               </View>
                           )
                       }}
                       keyExtractor={(item) => item.key}
                       ListHeaderComponent={
                           <>
                               <View style={styles.balanceContainer}>
                                   <View>
                                       <Text style={[styles.text, {fontSize: 16}]}>Current
                                           Price</Text>
                                       <Text
                                           style={[styles.text, styles.currentBalance]}>{currentBalance.toFixed(2)}</Text>
                                       <Text style={{
                                           ...styles.valueChange,
                                           marginTop: 4,
                                           color: boughtValue - currentBalance > 0 ? '#16c784' : '#ea3943'
                                       }}>{(boughtValue - currentBalance).toFixed(2)}
                                           US$ (24h)</Text>
                                   </View>
                                   <View style={{
                                       ...styles.pricePercentage,
                                       backgroundColor: color
                                   }}>
                                       <AntDesign name={icon} style={{marginRight: 2}}
                                                  size={10}
                                                  color='white'/>
                                       <Text
                                           style={[styles.text, styles.percentage]}>{percentageValue.toFixed(2)}%</Text>
                                   </View>
                               </View>
                               <View style={styles.assetContainer}>
                                   <Text style={[styles.assetsText]}>Your assets</Text>
                               </View>
                           </>
                       }
                       renderItem={({item}, rowMap) => <PortfolioAssetItem item={item}/>}
                       ListFooterComponent={
                           <Pressable onPress={() => navigation.navigate('AddNewAsset')}
                                      style={styles.bottomContainer}>
                               <Text style={styles.bottomText}>Add new Assets</Text>
                           </Pressable>
                       }
        />

    );
}

const styles = StyleSheet.create({
    text: {
        color: 'white'
    },
    currentBalance: {
        fontSize: 40,
        fontWeight: '700',
        letterSpacing: 1
    },
    valueChange: {
        fontWeight: '600',
        fontSize: 16,
        color: '#16c784'
    },
    percentage: {
        fontWeight: '500',
        fontSize: 17
    },
    balanceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 5
    },
    pricePercentage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 5
    },
    assetsText: {
        fontWeight: '700',
        color: 'white',
        marginTop: 10,
        fontSize: 23,
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    assetContainer: {},
    bottomContainer: {
        backgroundColor: '#4961E1',
        padding: 10,
        alignItems: 'center',
        marginVertical: 25,
        marginHorizontal: 15,
        borderRadius: 5
    },
    bottomText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '600'
    }
})

export default PortfolioAssetsList;