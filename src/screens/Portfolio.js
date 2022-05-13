import React, {Suspense} from 'react';
import {Text, View} from "react-native";
import PortfolioAssetsList from "../components/porfolioAssets";

function Portfolio() {
    return (
        <View>
            <Suspense fallback={<Text style={{color: 'white'}}>Loading ...</Text>}>
                <PortfolioAssetsList/>
            </Suspense>
        </View>
    );
}

export default Portfolio;