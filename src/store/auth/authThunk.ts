import { ApiPath } from "@/common/enums/app/ApiPath";
import { RegisterRequest, LoginRequest } from "@/common/types/Auth/auth.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const register = createAsyncThunk(
    'user/register',
    async (data: RegisterRequest) => {
        const response = await axios.post(`/api/${ApiPath.Auth}/register`, data)
        return response.data;
    }
)

const login = createAsyncThunk(
    'user/login',
    async (data: LoginRequest) => {
        const response = await axios.post(`/api/${ApiPath.Auth}/login`, data)
        return response.data;
    }
)


export {
    register,
    login
}