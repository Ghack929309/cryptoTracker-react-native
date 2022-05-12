import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/HomeScreen";
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import WatchList from "../screens/WatchList";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor:'#121212'
                }
            }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon:({focused,color})=>(<Entypo name="home" size={focused?30:25} color={color} />)
            }}/>
            <Tab.Screen name="Watchlist" component={WatchList} options={{
                tabBarIcon:({focused,color})=>(<AntDesign name="eye" size={focused?30:25} color={color} />)
            }} />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator