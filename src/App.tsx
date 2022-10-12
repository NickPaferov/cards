import {HashRouter, Route, Routes} from "react-router-dom";
import {BaseLayout} from "./layouts/BaseLayout";
import {EmptyLayout} from "./layouts/EmptyLayout";
import {ForgotPasswordPage} from "./pages/ForgotPasswordPage";
import {HomePage} from "./pages/HomePage";
import {NotFoundPage} from "./pages/NotFoundPage";
import {ProfilePage} from "./pages/ProfilePage";
import {ResetPasswordPage} from "./pages/ResetPasswordPage";
import {SignInPage} from "./pages/SignInPage";
import {SignUpPage} from "./pages/SignUpPage";
import {TestPage} from "./pages/TestPage";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<BaseLayout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="signin" element={<SignInPage/>}/>
                    <Route path="signup" element={<SignUpPage/>}/>
                    <Route path="profile" element={<ProfilePage/>}/>
                    <Route path="forgot-password" element={<ForgotPasswordPage/>}/>
                    <Route path="reset-password" element={<ResetPasswordPage/>}/>
                    <Route path="test" element={<TestPage/>}/>
                </Route>
                <Route element={<EmptyLayout/>}>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </HashRouter>
    );
}

export default App;