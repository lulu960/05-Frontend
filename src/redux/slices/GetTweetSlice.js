import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/Axios';

export const getTweets = createAsyncThunk(
    'getTweets',
    async (token, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/api/forum/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            console.error('Get Tweets error:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getTweetsBefore = createAsyncThunk(
    'getTweetsBefore',
    async ({ token, timestamp }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/api/forum/before/${timestamp}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Get Tweets Before error:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const initialState = {
    tweets: [],
    status: 'idle',
    error: null,
    hasMore: true, // Added to manage infinite scrolling
};

const getTweetsSlice = createSlice({
    name: 'getTweets',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch initial tweets
            .addCase(getTweets.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTweets.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tweets = action.payload;
                state.hasMore = action.payload.length > 0; // Check if more tweets exist
            })
            .addCase(getTweets.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Fetch older tweets for infinite scroll
            .addCase(getTweetsBefore.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTweetsBefore.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tweets = [...state.tweets, ...action.payload]; // Append tweets
                if (action.payload.length === 0) {
                    state.hasMore = false; // No more tweets to load
                }
            })
            .addCase(getTweetsBefore.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default getTweetsSlice.reducer;
