import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

//fetching data fot all coins
export function fetchData(page = 1) {
  let config = {
    method: "get",
    url: "https://api.coingecko.com/api/v3/coins/markets",
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 20,
      page: page,
      sparkline: false,
      price_change_percentage: "24h",
    },
    headers: {
      accept: "application/json",
    },
  };
  try {
    return new Promise((res, rej) => {
      axios(config)
        .then(function (response) {
          return res(response.data);
        })
        .catch(function (error) {
          console.log("can't get data from fetchData");
          return rej(error);
        });
    });
  } catch (error) {
    console.log("can't get data from fetchData");
  }
}

//fetching prices for each coin
export function fetchPrices(coin, days) {
  const config = {
    method: "get",
    url: `https://api.coingecko.com/api/v3/coins/${coin}/market_chart`,
    params: {
      vs_currency: "usd",
      days: days,
      interval: "hourly",
    },
    headers: {
      accept: "application/json",
    },
  };

  try {
    return new Promise((res, rej) => {
      axios(config)
        .then(function (response) {
          return res(response.data);
        })
        .catch(function (error) {
          console.log("can't get data from fetchPrices");
          return rej(error);
        });
    });
  } catch (error) {
    console.log("can't get data from fetchPrices");
  }
}

//fetching specific data for each coin id
export const getDetailCoin = (id) => {
  try {
    return new Promise((res, rej) => {
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`
        )
        .then((response) => {
          return res(response.data);
        })
        .catch((error) => {
          console.log("can't get data from getDetailCoin");
          return rej(error);
        });
    });
  } catch (e) {
    console.log("can't get data from getDetailCoin");
  }
};

//fetch candle chart data
export const candleChartData = async (data) => {
  try {
    const { coin, interval } = data;
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coin}/ohlc?vs_currency=usd&days=${interval}`
    );
    return response.data;
  } catch (e) {
    console.log("can't get data from candleChartData");
  }
};

//getting data form local storage
export const getDataFromLocal = async () => {
  try {
    const response = await AsyncStorage.getItem("@watchlist");
    if (response !== null) {
      return JSON.parse(response);
    }
  } catch (e) {
    console.log(e);
  }
};

// fetching current data for watch list
export function fetchWatchlistData(ids, page = 1) {
  const config = {
    method: "get",
    url: "https://api.coingecko.com/api/v3/coins/markets",
    params: {
      vs_currency: "usd",
      ids: ids,
      order: "market_cap_desc",
      page: page,
      sparkline: false,
      price_change_percentage: "24h",
    },
    headers: {
      accept: "application/json",
    },
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then((response) => {
        return resolve(response.data);
      })
      .catch((e) => {
        reject(e);
        console.log(e);
      });
  });
}

export const fetchAllCoin = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/list?include_platform=false"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
