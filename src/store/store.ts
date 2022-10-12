import {
    applyMiddleware,
    combineReducers,
    legacy_createStore as createStore,
} from "redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppActionType, appReducer} from "./app-reducer";

const rootReducer = combineReducers({app: appReducer});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type RootStateType = ReturnType<typeof store.getState>;

export type InferActionTypes<T> = T extends {
        [keys: string]: (...args: any[]) => infer U;
    }
    ? U
    : never;

type AppActionsType = AppActionType;

export type AppDispatch = ThunkDispatch<RootStateType, unknown, AppActionsType>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, AppActionsType>;

export type AppThunks = { [key: string]: (...args: any[]) => AppThunk };