import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const register = createAsyncThunk(
    'user/register',
    async (data) => {
        const response = await axios.post('/api/user/register', data)
        return response.data;
    }
)

const login = createAsyncThunk(
    'user/login',
    async (data) => {
        const response = await axios.post('/api/user/login', data)
        return response.data;
    }
)


export {
    register,
    login
}