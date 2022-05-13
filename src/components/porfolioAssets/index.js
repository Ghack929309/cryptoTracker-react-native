import React from 'react';
import {FlatList, Text, View, StyleSheet, Pressable} from "react-native";
import tw from "tailwind-react-native-classnames";
import {AntDesign} from "@expo/vector-icons";
import PortfolioAssetItem from "./PortfolioAssetItem";
import {useNavigation} from "@react-navigation/native";
import {useRecoilState,useRecoilValue} from "recoil";
import {allPortfolioAssets} from "../../atoms/PortfolioAssets";

function PortfolioAssetsList() {
    const navigation = useNavigation()
    const assets=useRecoilValue(allPortfolioAssets)
    console.log(assets)
    return (
        <View>
            <FlatList data={assets}
                      ListHeaderComponent={
                          <>
                              <View style={styles.balanceContainer}>
                                  <View>
                                      <Text style={[styles.text, {fontSize: 16}]}>Current
                                          Price</Text>
                                      <Text
                                          style={[styles.text, styles.currentBalance]}>$2000</Text>
                                      <Text style={[styles.text, styles.valueChange]}>1000
                                          (All
                                          time)</Text>
                                  </View>
                                  <View style={[styles.pricePercentage]}>
                                      <AntDesign name='caretup' style={{marginRight: 2}}
                                                 size={10}
                                                 color="white"/>
                                      <Text
                                          style={[styles.text, styles.percentage]}>1,2%</Text>
                                  </View>
                              </View>
                              <View style={styles.assetContainer}>
                                  <Text style={[styles.assetsText]}>Your assets</Text>
                              </View>
                          </>
                      }
                      renderItem={({item}) => <PortfolioAssetItem item={item}/>}
                      ListFooterComponent={
                          <Pressable onPress={()=>navigation.navigate('AddNewAsset')} style={styles.bottomContainer}>
                              <Text style={styles.bottomText}>Add new Assets</Text>
                          </Pressable>
                      }
            />
        </View>
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
        backgroundColor: '#16c784',
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
    bottomContainer:{
    backgroundColor:'#4961E1',
        padding:10,
        alignItems:'center',
        marginVertical:25,
        marginHorizontal:15,
        borderRadius:5
    },
    bottomText:{
        color:'white',
        fontSize:17,
        fontWeight:'600'
    }
})

export default PortfolioAssetsList;