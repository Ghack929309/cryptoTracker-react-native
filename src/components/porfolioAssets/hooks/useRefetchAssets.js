import React from 'react';
import { useSetRecoilState} from "recoil";
import { refetchAtom} from "../atoms/PortfolioAssets";

//this is a fake hook, this hook just increment to change the state of an atom
//this atom subscribes to a selector that fetch assets data
function UseRefetchAssets(coinIds) {
   if(coinIds===undefined)return
   const setRequestId=useSetRecoilState(refetchAtom(coinIds))
   return()=>setRequestId((id)=>id+1)
}

export default UseRefetchAssets;