import React, {memo, useEffect, useState} from 'react';
import {Text, View, StyleSheet, Pressable} from "react-native";
import tw from "tailwind-react-native-classnames";
import {useRecoilState, useSetRecoilState} from "recoil";
import {MaterialIcons} from "@expo/vector-icons";
import {charIntervalAtom, toggleAtom} from "../atom";


function Filter({ color}) {
    const  setInterval = useSetRecoilState(charIntervalAtom)
    const filter = ['24h', '7d', '30d', '1y', 'All']
    const [itemFilter, setItemFilter] = useState('24h')
    const [toggle,setToggle]=useRecoilState(toggleAtom)

    useEffect(() => {
        setInterval(1)
    }, [])

    const onFilter = (item) => {
        setItemFilter(item)
        if (item === '24h') return setInterval(1)
        else if (item === '7d') return setInterval(7)
        else if (item === '30d') return setInterval(30)
        else if (item === '1y') return setInterval(365)
        else if (item === 'All') return setInterval( 'max')
    }

    return (
        <View
        style={[tw`flex-row justify-between`, styles.container]}>
        {filter.map((item, id) => (
            <Pressable key={id} onPress={() => onFilter(item)}
                       style={{
                           ...styles.itemContainer,
                           backgroundColor: item === itemFilter ? '#0c161c' : 'transparent'
                       }}>
                <Text style={[tw`text-white`, styles.filter]}>{item}</Text>
            </Pressable>
        ))}
        {toggle ? (
            <MaterialIcons onPress={() => setToggle(!toggle)} name="waterfall-chart"
                           size={24} color={color}/>

        ) : (
            <MaterialIcons onPress={() => setToggle(!toggle)} name="show-chart" size={24}
                           color={color}/>

        )}
    </View>);
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#132127',
        paddingVertical: 5,
        marginHorizontal: 10,
        paddingHorizontal: 5,
        borderRadius: 5,
        marginBottom: 10
    },
    itemContainer: {
        borderRadius: 5,
        paddingHorizontal: 16,
        paddingVertical: 2,


    },
    filter: {
        fontWeight: '500',
        fontSize: 16,
    }
})

export default memo(Filter);