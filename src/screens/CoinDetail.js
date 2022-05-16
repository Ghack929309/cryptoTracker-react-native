import {memo, Suspense} from 'react'
import {ActivityIndicator} from "react-native";
import ChartSelector from "../components/coinDetailsComponent";

function CoinDetail() {

    return (
        <Suspense fallback={<ActivityIndicator size='large'/>}>
            <ChartSelector/>
        </Suspense>
    )

}

export default memo(CoinDetail);