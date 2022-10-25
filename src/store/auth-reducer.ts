import {
  authApi,
  LoginParamsType,
  LoginResponseType,
  RegisterParamsType,
  ResetParamsType,
  ResetPasswordType,
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
    case "AUTH/SET_USER":
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
  setUser: (user: UserDomainType) => ({
    type: "AUTH/SET_USER" as const,
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
        dispatch(authActions.setUser(user));
        dispatch(appActions.setSnackbarMessage("Sign in successfully"));
        isSuccessful = true;
      } catch (e) {
        handleApiError(e, dispatch);
      } finally {
        dispatch(appActions.setIsLoading(false));
      }

      return isSuccessful;
    },
  forgotPassword:
    (data: ResetParamsType): AppThunk<Promise<boolean>> =>
    async (dispatch) => {
      let isSuccessful = false;
      dispatch(appActions.setIsLoading(true));
      try {
        const reset = await authApi.forgotPassword(data);
        dispatch(appActions.setSnackbarMessage(reset.info));
        isSuccessful = true;
      } catch (e) {
        handleApiError(e, dispatch);
      } finally {
        dispatch(appActions.setIsLoading(false));
      }

      return isSuccessful;
    },
  resetPassword:
    (data: ResetPasswordType): AppThunk<Promise<boolean>> =>
    async (dispatch) => {
      let isSuccessful = false;
      dispatch(appActions.setIsLoading(true));
      try {
        const reset = await authApi.resetPassword(data);
        dispatch(appActions.setSnackbarMessage(reset.info));
        isSuccessful = true;
      } catch (e) {
        handleApiError(e, dispatch);
      } finally {
        dispatch(appActions.setIsLoading(false));
      }

      return isSuccessful;
    },
  logout: (): AppThunk => async (dispatch) => {
    dispatch(appActions.setIsLoading(true));
    try {
      await authApi.logout();
      dispatch(authActions.setUser(null));
      dispatch(appActions.setSnackbarMessage("Log out successfully"));
    } catch (e) {
      handleApiError(e, dispatch);
    } finally {
      dispatch(appActions.setIsLoading(false));
    }
  },
  changeData:
    (data: { name: string }): AppThunk =>
    async (dispatch) => {
      if (!data.name) {
        return;
      }
      dispatch(appActions.setIsLoading(true));
      try {
        const user = await authApi.updateProfileData(data);
        dispatch(authActions.setUser(user.updatedUser));
        console.log(user.updatedUser.name);
        dispatch(appActions.setSnackbarMessage("Change name successfully"));
      } catch (e) {
        handleApiError(e, dispatch);
      } finally {
        dispatch(appActions.setIsLoading(false));
      }
    },
};

export type UserDomainType = null | LoginResponseType;

export type AuthActionType = InferActionTypes<typeof authActions>;

export type AuthStateType = { user: UserDomainType };
