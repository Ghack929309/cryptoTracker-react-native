import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import Navigation from "./src/navigation";
import tw from "tailwind-react-native-classnames";
import { RecoilRoot } from "recoil";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import CoinContext from "./src/api/api";

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }
  return (
    <NavigationContainer theme={{ colors: { background: "#040303" } }}>
      <RecoilRoot>
        {/*<CoinContext>*/}
        <View style={[styles.container, tw`pt-10`]}>
          <Navigation />
          <StatusBar style="light" />
        </View>
        {/*</CoinContext>*/}
      </RecoilRoot>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#040303",
  },
});
