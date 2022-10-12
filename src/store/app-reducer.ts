import { InferActionTypes } from "./store";

const initialState: AppStateType = {};

export const appReducer = (
    state = initialState,
    action: AppActionType
): AppStateType => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export const appActions = {
  test: () => ({ type: "APP/TEST" }),
};

export type AppActionType = InferActionTypes<typeof appActions>;

export type AppStateType = {};