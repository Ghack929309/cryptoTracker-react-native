import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import {Ionicons} from "@expo/vector-icons";

function Logo({search, setSearch, setInput, input}) {
    return (
        <View>
            {
                search ? (
                    <View style={tw`flex-row p-4 items-center justify-center`}>
                        <TextInput
                            style={[tw`text-white border-white text-sm border-2 flex-1 p-3 rounded-xl`]}
                            placeholderTextColor="gray"
                            value={input} onChangeText={(text) => setInput(text)}
                            placeholder='Search coin'/>
                        <TouchableOpacity onPress={() => setSearch(!search)}
                                          style={tw`ml-3 `}>
                            <Text style={tw`text-white`}>cancel</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={tw`flex-row justify-between p-4`}>
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 22,
                                letterSpacing: 1,
                                paddingHorizontal: 20,
                                fontFamily:'Inter_900Black'
                            }}>CryptoTracker</Text>
                        <TouchableOpacity onPress={() => setSearch(!search)}>
                            <Ionicons name="md-search-outline" size={25} color="white"/>
                        </TouchableOpacity>
                    </View>
                )
            }
        </View>

    );
}

export default Logo;