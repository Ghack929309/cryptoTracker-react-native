import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {StyleSheet, Text, View} from 'react-native';
import CoinContext from "./src/context/CoinContext";
import HomeScreen from "./src/screens/HomeScreen";
import CoinDetail from "./src/screens/CoinDetail";
import tw from "tailwind-react-native-classnames";


export default function App() {
    return (
        <SafeAreaProvider>
            <CoinContext>
                <View style={[styles.container,tw`pt-10`]}>
                    <StatusBar style="light"/>
                    {/*<HomeScreen/>*/}
                    <CoinDetail/>
                </View>
            </CoinContext>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
});
