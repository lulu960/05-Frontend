import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/Axios';

const sendTweet = createAsyncThunk(
    'sendTweet',
    async (tweet, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('api/forum/', tweet);
            return response.data;
        } catch (error) {
            console.error('Tweet error:', error);
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    tweets: [],
    status: 'idle',
    error: null
};

const sendTweetSlice = createSlice({
    name: 'sendTweet',
    initialState,
    reducers: {
        postTweetStart(state) {
            state.status = 'loading';
        },
        postTweetSuccess(state, action) {
            state.status = 'succeeded';
            state.tweets.push(action.payload);
        },
        postTweetFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
});
export { sendTweet };
export const { postTweetStart, postTweetSuccess, postTweetFailure } = sendTweetSlice.actions;
export default sendTweetSlice.reducer;