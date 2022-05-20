import React from 'react';
import {View, Text, Pressable,StyleSheet} from 'react-native'
import tw from "tailwind-react-native-classnames";
import {Ionicons} from "@expo/vector-icons";

function CoinNews({id}) {
    return (
       <View style={tw`px-3`}>
         <View style={[tw`flex-row  pb-6 justify-between  mt-8`,{ borderBottomWidth: 1,
             borderBottomColor: '#7d7d7d'}]}>
             <Text style={styles.statText} >Statistics</Text>
             <Pressable style={tw`flex-row items-center`}>
             <Text style={styles.textSee}>See All</Text>
                 <Ionicons name="chevron-forward" size={20} color={"#4961E1"} />
             </Pressable>
         </View>
           <View style={tw`flex-row justify-between items-center my-6`}>
               <Text style={styles.lowHigh}>Low / High</Text>
               <View style={tw` flex-row justify-between`}>
                   {['24h','30d','1y'].map((item,i)=>(
                       <Text style={{...styles.lowHigh,marginRight:6}}>{item}</Text>
                   ))}

               </View>
           </View>
       </View>
    );
}
const styles=StyleSheet.create({
    textSee:{
        color:'#4961E1',
        fontSize:15,
        fontWeight:'600'
    },
    statText:{
        color:'white',
        fontSize:17,
        fontWeight:'600'
    },
    lowHigh:{
        color:'gray',
        fontSize:16,
        fontWeight:'500',
    }
})
export default CoinNews;