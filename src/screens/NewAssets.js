import React, { Suspense } from "react";
import { ActivityIndicator } from "react-native";
import NewAssetLayout from "../components/newAsset";

function NewAssets() {
  return (
    <Suspense fallback={<ActivityIndicator size={"large"} />}>
      <NewAssetLayout />
    </Suspense>
  );
}

export default NewAssets;
