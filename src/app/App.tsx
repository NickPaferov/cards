import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
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

function App() {
  const theme = useMemo(() => createTheme(getDesignTokens()), []);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<BaseLayout />}>
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
