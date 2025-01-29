import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/Axios';


const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('api/auth/login', credentials);
            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    isAuthenticated: false,
    user: null,
    status: 'idle'
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },

    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;

        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
                state.status = 'success';
            })
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.isAuthenticated = false;
            })
            .addCase(login.rejected, (state) => {
                state.status = 'failed';
                state.isAuthenticated = false;
            });
    }
});

export const { logout } = authSlice.actions;
export { login };
export default authSlice.reducer;