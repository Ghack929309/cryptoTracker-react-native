import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import CoinDetail from "../screens/CoinDetail";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack= createStackNavigator()

const Navigation =()=>{
   return(
       <Stack.Navigator initialRouteName="Root" screenOptions={{headerShown:false}}>
           <Stack.Screen name='Root' component={BottomTabNavigator} />
           <Stack.Screen name='CoinDetail' component={CoinDetail}/>
       </Stack.Navigator>
   )
}
export default Navigation