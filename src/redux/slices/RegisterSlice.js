import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/Axios';
import { createAsyncThunk } from '@reduxjs/toolkit';    

const register = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('api/auth/register', userData);
            return response.data;
        } catch (error) {
            console.error('Registration error:', error);
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    isRegistered: false,
    userInfo: null,
    error: null,
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        registerStart(state) {
            state.isRegistered = false;
            state.error = null;
        },
        registerSuccess(state, action) {
            state.isRegistered = true;
            state.userInfo = action.payload;
            state.error = null;
        },
        registerFailure(state, action) {
            state.isRegistered = false;
            state.error = action.payload;
        },
    },
});

export const { registerStart, registerSuccess, registerFailure } = registerSlice.actions;
export { register };
export default registerSlice.reducer;