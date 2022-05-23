import { createStackNavigator } from "@react-navigation/stack";
import CoinDetail from "../screens/CoinDetail";
import BottomTabNavigator from "./BottomTabNavigator";
import NewAssets from "../screens/NewAssets";

const Stack = createStackNavigator();

function Navigation() {
  return (
    <Stack.Navigator initialRouteName="Root">
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CoinDetail"
        component={CoinDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddNewAsset"
        component={NewAssets}
        options={{
          title: "Add New Asset",
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: "#040303",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default Navigation;
