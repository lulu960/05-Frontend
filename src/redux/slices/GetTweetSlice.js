import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/Axios';

const getTweets = createAsyncThunk(
    'getTweets',
    async (token, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('api/forum/', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            console.error('Get Tweets error:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const initialState = {
    tweets: [],
    status: 'idle',
    error: null
};

const getTweetsSlice = createSlice({
    name: 'getTweets',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTweets.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTweets.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tweets = action.payload;
            })
            .addCase(getTweets.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export { getTweets };
export default getTweetsSlice.reducer;
