import {atom, selector, selectorFamily} from "recoil";
import {fetchData, fetchPrices} from "../../../api/api";

//*********************************************************************

//fetching coin data only
const getCoinDataSelector=selector({
    key:'getCoinDataSelector',
    get:async ({get})=>{
        const page=get(getCoinPageAtom)
        const onlyData=await fetchData(page)
        return onlyData;
    }
})
//store coin page
export const getCoinPageAtom=atom({
    key:'getCoinPageAtom',
    default:1
})
//store coin data
export const getCoinDataAtom=atom({
    key:'getCoinDataAtom',
    default:getCoinDataSelector||[]
})
//*********************************************************************
//fetching prices base on coin id
export const getCoinPriceSelector=selectorFamily({
    key:'getCoinPriceSelector',
    get:({coin,day})=>async ({get})=>{
        const prices = await fetchPrices(coin,day)
        return prices
    }
})


