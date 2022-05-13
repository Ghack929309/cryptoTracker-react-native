import React from 'react';
import {Text, View} from "react-native";
import PortfolioAssetsList from "../components/porfolioAssets";

function Portfolio(props) {
    return (
       <View>
          <PortfolioAssetsList/>
       </View>
    );
}

export default Portfolio;