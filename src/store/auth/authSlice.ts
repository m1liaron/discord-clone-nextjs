import { createSlice } from "@reduxjs/toolkit";
import { register } from "./authThunk";

type User = {
    id: number,
    name: string
    email: string
}

export interface IAuthState {
  user: null | User,
  isLoading: boolean
}

const initialState: IAuthState = {
  user: null,
  isLoading: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
      builder
          .addCase(register.pending, (state: IAuthState) => {
              state.isLoading = true;
          })
          .addCase(register.fulfilled, (state: IAuthState, action) => {
            state.isLoading = false;
            state.user = action.payload;
          })
          .addCase(register.rejected, (state: IAuthState) => {
            state.isLoading = false;
          })
    }
  });
  
export const authReducer = authSlice.reducer;