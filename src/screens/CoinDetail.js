import {memo, Suspense} from 'react'
import {ActivityIndicator} from "react-native";
import SplitCoinDetails from '../components/coinDetailsComponent'

function CoinDetail() {

    return (
        <Suspense fallback={<ActivityIndicator size='large'/>}>
            <SplitCoinDetails/>
        </Suspense>
    )

}

export default memo(CoinDetail);