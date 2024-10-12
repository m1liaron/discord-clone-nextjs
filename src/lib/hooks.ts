import { useDispatch, useSelector, useStore } from "react-redux";
import type { Appdispatch, AppStore, RootState } from "./store";

export const useAppDispatch = useDispatch.withTypes<Appdispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();