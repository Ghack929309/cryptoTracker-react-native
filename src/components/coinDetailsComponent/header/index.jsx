import { useContext } from "react";
import { Image, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  removeIdFromWatchlistSelector,
  storeWatchlistDataLocalSelector,
  watchlistLocalAtom,
} from "../../watchlist/atom";

function Header({ small, symbol, market_cap_rank, id }) {
  const navigation = useNavigation();
  const storeOnLocal = useRecoilValue(storeWatchlistDataLocalSelector(id));
  const removeFromLocal = useRecoilValue(removeIdFromWatchlistSelector(id));
  const [storage, setStorage] = useRecoilState(watchlistLocalAtom);
  const watched = storage?.some((coinId) => coinId === id);
  // if already stored remove else store it
  const watchlistHandler = () => {
    if (watched) {
      return setStorage(removeFromLocal);
    }
    setStorage(storeOnLocal);
  };
  return (
    <View style={tw`flex-row items-center justify-between px-2`}>
      <Ionicons
        onPress={() => navigation.goBack()}
        name="chevron-back"
        size={30}
        color="white"
      />
      <View style={tw`flex-row`}>
        <Image source={{ uri: small }} style={{ width: 25, height: 25 }} />
        <Text style={tw`text-white uppercase font-bold mx-2 text-base`}>
          {symbol}
        </Text>
        <View
          style={[
            tw`rounded-md self-center`,
            {
              backgroundColor: "#585858",
              paddingHorizontal: 5,
              paddingVertical: 2,
            },
          ]}
        >
          <Text style={[tw`text-white font-bold`, { fontSize: 15 }]}>
            #{market_cap_rank}
          </Text>
        </View>
      </View>
      <FontAwesome
        onPress={watchlistHandler}
        name={watched ? "star" : "star-o"}
        size={24}
        color={watched ? "#FFBF00" : "white"}
      />
    </View>
  );
}

export default Header;
