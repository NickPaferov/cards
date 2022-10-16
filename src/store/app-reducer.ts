import { InferActionTypes } from "./store";

const initialState: AppStateType = {
  isLoading: false,
};

export const appReducer = (
  state = initialState,
  action: AppActionType
): AppStateType => {
  switch (action.type) {
    case "APP/SET_IS_LOADING": {
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
};

export type AppStateType = { isLoading: boolean };

export type AppActionType = InferActionTypes<typeof appActions>;
