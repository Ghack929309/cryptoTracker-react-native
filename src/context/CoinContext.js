import { createContext } from "react";

export const CoinProvider = createContext(null);

function CoinContext({ children }) {
  const data = [];
  return (
    <CoinProvider.Provider value={{ data }}>{children}</CoinProvider.Provider>
  );
}

export default CoinContext;
