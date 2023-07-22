import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CryptoApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "X-RapidAPI-Key": "e3bdc0e3e6mshabcee6861650d4ap19d52bjsn608337d46ee4",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: CryptoApiHeaders });

const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) => createRequest(`/coin/${coinId}/history/${timeperiod}`),

    }),
  })
});

export const { useGetCryptosQuery ,useGetCryptoDetailsQuery,useGetCryptoHistoryQuery } = cryptoApi;
export default cryptoApi;
