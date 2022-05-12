import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {StyleSheet, View} from 'react-native';
import CoinContext from "./src/context/CoinContext";
import Navigation from "./src/navigation";
import tw from "tailwind-react-native-classnames";


export default function App() {
    return (
        <NavigationContainer theme={{colors: {background: '#040303'}}}>
            <CoinContext>
                <View style={[styles.container, tw`pt-10`]}>
                    <Navigation/>
                    <StatusBar style="light"/>
                </View>
            </CoinContext>
        </NavigationContainer>
    )
        ;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#121212',
        backgroundColor: '#040303'
    },
});
