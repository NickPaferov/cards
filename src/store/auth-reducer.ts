import { authApi, RegisterParamsType } from "../api/auth-api";
import { handleApiError } from "../utils/handle-api-errors";
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
    (data: RegisterParamsType): AppThunk<Promise<boolean>> =>
    async (dispatch) => {
      let isSuccessful = false;

      dispatch(appActions.setIsLoading(true));
      try {
        await authApi.register(data);
        dispatch(appActions.setSnackbarMessage("Sign up successfully"));
        isSuccessful = true;
      } catch (e) {
        handleApiError(e, dispatch);
      } finally {
        dispatch(appActions.setIsLoading(false));
      }

      return isSuccessful;
    },
};

export type AuthActionType = InferActionTypes<typeof authActions>;

export type AuthStateType = {};
