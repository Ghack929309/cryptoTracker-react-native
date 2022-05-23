import React, { Suspense } from "react";
import { View, ActivityIndicator } from "react-native";
import PortfolioAssetsList from "../components/porfolioAssets";

function Portfolio() {
  // TODO  fix error 504 after removing a coin in the portfolio

  return (
    <View style={{ flex: 1 }}>
      <Suspense
        fallback={(
          <ActivityIndicator
            style={{ marginTop: 50, color: "white" }}
            size="large"
          />
        )}
      >
        <PortfolioAssetsList />
      </Suspense>
    </View>
  );
}

export default Portfolio;
