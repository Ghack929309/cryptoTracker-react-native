import React, { Suspense } from "react";
import { ActivityIndicator } from "react-native";
import NewAssetLayout from "../components/newAsset";

function NewAssets() {
  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <NewAssetLayout />
    </Suspense>
  );
}

// TODO wait for fetch coin detail before dissable the button add new asset
export default NewAssets;
