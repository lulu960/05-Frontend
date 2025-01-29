import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';
import  registerReducer  from './slices/RegisterSlice';
import sendTweetReducer from './slices/SendTweetSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer,
        sendTweet: sendTweetReducer,
    },
});

export default store;