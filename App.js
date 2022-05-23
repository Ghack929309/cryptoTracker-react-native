import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import tw from "tailwind-react-native-classnames";
import { RecoilRoot } from "recoil";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider } from "react-query";
import Navigation from "./src/navigation";
import CoinContext from "./src/api/api";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_900Black,
  });
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      },
    },
  });
  // TODO refactor watchlist, migrate from recoil to react state
  // TODO refactor portfolio do the same thing
  // TODO refactor the coin detail, do the same
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }
  return (
    <NavigationContainer theme={{ colors: { background: "#040303" } }}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          {/* <CoinContext> */}
          <View style={[styles.container, tw`pt-10`]}>
            <Navigation />
            <StatusBar style="light" />
          </View>
          {/* </CoinContext> */}
        </QueryClientProvider>
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
