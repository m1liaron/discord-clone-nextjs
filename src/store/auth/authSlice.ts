import { createSlice } from "@reduxjs/toolkit";
import { register, login } from "./authThunk";
import { DataStatus } from "@/common/enums/app/DataStatus";

type User = {
    id: number,
    name: string
    email: string
}

export interface IAuthState {
  user: null | User,
  isLoading: boolean,
  status: DataStatus
}

const initialState: IAuthState = {
  user: null,
  isLoading: false,
  status: DataStatus.Idle
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
      builder
          .addCase(register.pending, (state: IAuthState) => {
              state.isLoading = true;
              state.status = DataStatus.Pending;
          })
          .addCase(register.fulfilled, (state: IAuthState, action) => {
            state.isLoading = false;
            state.status = DataStatus.Success;
            state.user = action.payload;
          })
          .addCase(register.rejected, (state: IAuthState) => {
            state.isLoading = false;
            state.status = DataStatus.Error;
          })

          .addCase(login.pending, (state: IAuthState) => {
            state.isLoading = true;
            state.status = DataStatus.Pending;
          })
          .addCase(login.fulfilled, (state: IAuthState, action) => {
            state.isLoading = false;
            state.status = DataStatus.Success;
            state.user = action.payload;
          })
          .addCase(login.rejected, (state: IAuthState) => {
            state.isLoading = false;
            state.status = DataStatus.Error;
          })
    }
  });
  
export const authReducer = authSlice.reducer;