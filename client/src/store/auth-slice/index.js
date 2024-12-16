import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null
}

// for making registration api call
export const registerUser = createAsyncThunk('/auth/register',
    async (formData) => {
        const response = await axios.post('http://localhost:5000/api/auth/register', formData, {
            withCredentials: true
        });
        return response.data;
    }
)

export const loginUser = createAsyncThunk('/auth/login',
    async (formData) => {
        const response = await axios.post('http://localhost:5000/api/auth/login', formData, {
            withCredentials: true
        });
        console.log(response)
        return response.data;
    }
)

export const logoutUser = createAsyncThunk('/auth/logout',
    async () => {
        const response = await axios.post('http://localhost:5000/api/auth/logout', {}, {
            withCredentials: true
        });
        console.log(response)
        return response.data;
    }
)

export const checkAuth = createAsyncThunk('/auth/check-auth',
    async () => {
        const response = await axios.get('http://localhost:5000/api/auth/check-auth', {
            withCredentials: true,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
            }
        });
        return response.data;
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => { }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        }).addCase(registerUser.rejected, (state, action) => {
            state.isLoading = true;
            state.user = null;
            state.isAuthenticated = false;
        }).addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.success === 'false' ? null : action.payload.user;
            state.isAuthenticated = action.payload.success === 'false' ? false : true;
        }).addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        }).addCase(checkAuth.pending, (state) => {
            state.isLoading = true;
        }).addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.success === 'false' ? null : action.payload.user;
            state.isAuthenticated = action.payload.success === 'false' ? false : true;
        }).addCase(checkAuth.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        }).addCase(logoutUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
    }
})

export const { setUser } = authSlice.actions
export default authSlice.reducer