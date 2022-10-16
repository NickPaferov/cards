import { AxiosError } from "axios";
import { appActions } from "../store/app-reducer";
import { AppDispatch } from "../store/store";

export const handleApiError = (
  error: unknown | Error | AxiosError,
  dispatch: AppDispatch
) => {
  const e = error as Error | AxiosError;

  let message =
    e instanceof AxiosError && e.response?.data?.error
      ? e.response.data.error
      : e.message || "Something went wrong";

  dispatch(appActions.setSnackbarMessage(message, "error"));
};
