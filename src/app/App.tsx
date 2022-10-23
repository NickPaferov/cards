import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useMemo } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { BaseLayout } from "../layouts/BaseLayout/BaseLayout";
import { ForgotPasswordPage } from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import { HomePage } from "../pages/HomePage/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage";
import { ResetPasswordPage } from "../pages/ResetPasswordPage/ResetPasswordPage";
import { SignInPage } from "../pages/SignInPage/SignInPage";
import { SignUpPage } from "../pages/SignUpPage/SignUpPage";
import { getDesignTokens } from "../utils/get-design-tokens";
import { SnackbarProvider } from "notistack";
import { useAppSelector } from "../hooks/useAppSelector";
import { CircularProgress } from "@mui/material";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { appThunks } from "../store/app-reducer";

function App() {
  const theme = useMemo(() => createTheme(getDesignTokens()), []);
  const isInitialized = useAppSelector((state) => state.app.isInitialized);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(appThunks.initialize());
  }, []);

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "45%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<BaseLayout center wrap />}>
              <Route index element={<HomePage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            <Route element={<BaseLayout center wrap />}>
              <Route path="signin" element={<SignInPage />} />
              <Route path="signup" element={<SignUpPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              <Route
                path="reset-password/:id"
                element={<ResetPasswordPage />}
              />
            </Route>

            <Route element={<BaseLayout center />}>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
