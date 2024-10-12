import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const register = createAsyncThunk(
    'user/register',
    async (data) => {
        const response = await axios.post('/api/user/register')
        return response.data;
    }
)

export {
    register
}