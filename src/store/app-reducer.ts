import { VariantType } from "notistack";
import { AppThunk, InferActionTypes } from "./store";
import { authApi } from "../api/auth-api";
import { handleApiError } from "../utils/handle-api-error";
import { authActions } from "./auth-reducer";

const initialState: AppStateType = {
  isInitialized: false,
  isLoading: false,
  snackbar: { message: null, variant: "default", timestamp: null },
};

export const appReducer = (
  state = initialState,
  action: AppActionType
): AppStateType => {
  switch (action.type) {
    case "APP/SET_IS_INITIALIZED": {
      return { ...state, ...action.payload };
    }

    case "APP/SET_IS_LOADING": {
      return { ...state, ...action.payload };
    }

    case "APP/SET_SNACKBAR_MESSAGE": {
      return { ...state, ...action.payload };
    }

    default: {
      return state;
    }
  }
};

export const appActions = {
  setIsInitialized: (isInitialized: boolean) => ({
    type: "APP/SET_IS_INITIALIZED" as const,
    payload: { isInitialized },
  }),
  setIsLoading: (isLoading: boolean) => ({
    type: "APP/SET_IS_LOADING" as const,
    payload: { isLoading },
  }),
  setSnackbarMessage: (
    snackbarMessage: string,
    variant: VariantType = "default"
  ) => ({
    type: "APP/SET_SNACKBAR_MESSAGE" as const,
    payload: {
      snackbar: { message: snackbarMessage, variant, timestamp: Date.now() },
    },
  }),
};

export const appThunks = {
  isInitialized: (): AppThunk => async (dispatch) => {
    try {
      const user = await authApi.me();
      dispatch(authActions.setUser(user));
    } catch (e) {
      handleApiError(e, dispatch);
    } finally {
      dispatch(appActions.setIsInitialized(true));
    }
  },
};

export type AppStateType = {
  isInitialized: boolean;
  isLoading: boolean;
  snackbar: {
    message: null | string;
    variant: VariantType;
    timestamp: null | number;
  };
};

export type AppActionType = InferActionTypes<typeof appActions>;
