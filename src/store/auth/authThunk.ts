import { RegisterRequest, LoginRequest } from "@/common/types/Auth/auth.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const register = createAsyncThunk(
    'user/register',
    async (data: RegisterRequest) => {
        const response = await axios.post(`/api/auth/register`, data)
        return response.data;
    }
)

const login = createAsyncThunk(
    'user/login',
    async (data: LoginRequest) => {
        const response = await axios.post(`/api/auth/login`, data)
        return response.data;
    }
)


export {
    register,
    login
}