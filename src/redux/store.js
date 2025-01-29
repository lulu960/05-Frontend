import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';
import  registerReducer  from './slices/RegisterSlice';
import sendTweetReducer from './slices/SendTweetSlice';
import getTweetsReducer from './slices/GetTweetSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer,
        sendTweet: sendTweetReducer,
        getTweets: getTweetsReducer,
    },
});

export default store;