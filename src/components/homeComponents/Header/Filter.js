import tw from "tailwind-react-native-classnames";
import {Text, View, StyleSheet,Pressable} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

function Filter() {
    const navigation=useNavigation()
    return (
        <View style={tw`px-5 flex-row justify-between mb-4 pb-2`}>
            <View
                style={[tw`justify-center bg-gray-800 items-center flex-row rounded-full`, styles.filterCenter]}>
                <Ionicons name="ios-star-outline" style={tw`self-center`}
                          size={20}
                          color="white"/>
            </View>
            <Pressable
                onPress={()=>navigation.navigate('Watchlist')}
                style={[tw`justify-center items-center bg-gray-800  rounded-xl`, styles.filterCenter]}>
                <Text
                    style={tw`text-white font-semibold tracking-tight text-sm`}>My
                    Watchlist</Text>
            </Pressable>
            <View
                style={[tw`justify-center items-center bg-gray-800  rounded-xl`, styles.filterCenter]}>
                <Text
                    style={tw`text-white font-semibold tracking-tight text-sm`}>USD</Text>
            </View>
            <View
                style={[tw`justify-center items-center bg-gray-800  rounded-xl`, styles.filterCenter]}>
                <Text
                    style={tw`text-white font-semibold tracking-tight text-sm`}>Sort
                    by Rank</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    filterCenter: {
        paddingVertical: 3,
        paddingHorizontal: 15
    }
})
export default Filter;