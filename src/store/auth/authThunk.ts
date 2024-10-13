import { RegisterRequest, LoginRequest } from "@/common/types/Auth/auth.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const register = createAsyncThunk(
    'user/register',
    async (data: RegisterRequest, { rejectWithValue }) => {
        try {
            const response = await axios.post(`/api/auth/register`, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Registration failed');
        }
    }
)

const login = createAsyncThunk(
    'user/login',
    async (data: LoginRequest, { rejectWithValue }) => {
        try {
            const response = await axios.post(`/api/auth/login`, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Registration failed');
        }
    }
)


export {
    register,
    login
}