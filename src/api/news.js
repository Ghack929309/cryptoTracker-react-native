import axios from "axios";

export const fetchCoinNews = async (coin) => {
  const options = {
    method: "GET",
    url: "https://bing-news-search1.p.rapidapi.com/news/search",
    params: {
      q: coin,
      freshness: "Day",
      textFormat: "Raw",
      safeSearch: "Off",
    },
    headers: {
      "X-BingApis-SDK": "true",
      "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
      "X-RapidAPI-Key": "bf4fa3a809msh4f703146c7597f5p1b3b10jsn0ee7d3d40646",
    },
  };
  const response = await axios(options);
  return response.data;
};
