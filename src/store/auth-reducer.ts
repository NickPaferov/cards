import { authApi, RegisterParamsType } from "../api/auth-api";
import { appActions } from "./app-reducer";
import { AppThunk, InferActionTypes } from "./store";

const initialState: AuthStateType = {};

export const authReducer = (
  state = initialState,
  action: AuthActionType
): AuthStateType => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export const authActions = {
  test: () => ({
    type: "AUTH/TEST" as const,
  }),
};

export const authThunks = {
  signUp:
    (data: RegisterParamsType, enqueueSnackbar: any): AppThunk =>
    async (dispatch) => {
      dispatch(appActions.setIsLoading(true));
      try {
        await authApi.register(data);
        enqueueSnackbar("Sign Up successful", {});
      } catch (e: any) {
        enqueueSnackbar(e.response.data.error);
      } finally {
        dispatch(appActions.setIsLoading(false));
      }
    },
};

export type AuthActionType = InferActionTypes<typeof authActions>;

export type AuthStateType = {};
