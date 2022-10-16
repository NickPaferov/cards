import { VariantType } from "notistack";
import { InferActionTypes } from "./store";

const initialState: AppStateType = {
  isLoading: false,
  snackbar: { message: null, variant: "default", timestamp: null },
};

export const appReducer = (
  state = initialState,
  action: AppActionType
): AppStateType => {
  switch (action.type) {
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

export type AppStateType = {
  isLoading: boolean;
  snackbar: {
    message: null | string;
    variant: VariantType;
    timestamp: null | number;
  };
};

export type AppActionType = InferActionTypes<typeof appActions>;
