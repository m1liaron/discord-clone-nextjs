import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector, useStore } from "react-redux";

export const makeStore = () => {
    return configureStore({
        reducer: {}
    })
};

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type Appdispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<Appdispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();