import React, {memo, useState} from 'react';
import {Text, View, StyleSheet, Pressable} from "react-native";
import tw from "tailwind-react-native-classnames";
import {useRecoilState} from "recoil";
import {charIntervalState} from "../../../atoms/PortfolioAssets";
import {MaterialIcons} from "@expo/vector-icons";


function Filter({id, color, toggle, setToggle}) {
    const [interval, setInterval] = useRecoilState(charIntervalState)
    const filter = ['24h', '7d', '30d', '1y', 'All']
    const [itemFilter, setItemFilter] = useState('24h')

    const onFilter = (item) => {
        setItemFilter(item)
        if (item === '24h') return setInterval({coin: id, interval: 1})
        else if (item === '7d') return setInterval({coin: id, interval: 7})
        else if (item === '30d') return setInterval({coin: id, interval: 30})
        else if (item === '1y') return setInterval({coin: id, interval: 365})
        else if (item === 'All') return setInterval({coin: id, interval: 'max'})
    }

    return (<View
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