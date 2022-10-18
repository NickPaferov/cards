import {
  authApi,
  LoginParamsType,
  LoginResponseType,
  RegisterParamsType,
} from "../api/auth-api";
import { handleApiError } from "../utils/handle-api-error";
import { appActions } from "./app-reducer";
import { AppThunk, InferActionTypes } from "./store";

const initialState: AuthStateType = {
  user: null,
};

export const authReducer = (
  state = initialState,
  action: AuthActionType
): AuthStateType => {
  switch (action.type) {
    case "AUTH/SET_USER_DATA":
      return {
        ...state,
        ...action.payload,
      };
    default: {
      return state;
    }
  }
};

export const authActions = {
  setAuthUserData: (user: LoginResponseType) => ({
    type: "AUTH/SET_USER_DATA" as const,
    payload: { user },
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
  signIn:
    (data: LoginParamsType): AppThunk<Promise<boolean>> =>
    async (dispatch) => {
      let isSuccessful = false;

      dispatch(appActions.setIsLoading(true));
      try {
        const user = await authApi.login(data);
        dispatch(authActions.setAuthUserData(user));
        dispatch(appActions.setSnackbarMessage("Sign in successfully"));
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

export type AuthStateType = { user: null | LoginResponseType };
