import { ApiPath } from "@/common/enums/app/ApiPath";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const register = createAsyncThunk(
    'user/register',
    async (data) => {
        const response = await axios.post(`/api/${ApiPath.Auth}/register`, data)
        return response.data;
    }
)

const login = createAsyncThunk(
    'user/login',
    async (data) => {
        const response = await axios.post(`/api/${ApiPath.Auth}/login`, data)
        return response.data;
    }
)


export {
    register,
    login
}