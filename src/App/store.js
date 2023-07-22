import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit';

import cryptoApi, { useGetCryptosQuery } from '../services/cryptoApi';

import  cryptoNewsApi , { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
const middleware = getDefaultMiddleware().concat(cryptoApi.middleware, cryptoNewsApi.middleware);


export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
  middleware,
});
