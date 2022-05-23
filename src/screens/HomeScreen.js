import { Suspense, memo, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import tw from "tailwind-react-native-classnames";
import Filter from "../components/homeComponents/Header/Filter";
import Logo from "../components/homeComponents/Header/Logo";
import CoinList from "../components/homeComponents";

function HomeScreen() {
  const [search, setSearch] = useState(false);
  const [input, setInput] = useState("");

  console.log("home screen rerender");

  return (
    <View style={tw`pb-4 flex-1`}>
      <Logo
        search={search}
        setSearch={setSearch}
        input={input}
        setInput={setInput}
      />
      <Filter />
      <Suspense fallback={<ActivityIndicator size="large" />}>
        <CoinList />
      </Suspense>
    </View>
  );
}

export default memo(HomeScreen);
